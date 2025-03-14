package database

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// RunMigrations applies all SQL migration files in the migrations directory
func RunMigrations() error {
	// Ensure DB is connected
	if DB == nil {
		return fmt.Errorf("database connection not established")
	}

	// Create migrations table if it doesn't exist
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS migrations (
			id SERIAL PRIMARY KEY,
			migration_name VARCHAR(255) UNIQUE NOT NULL,
			applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return fmt.Errorf("failed to create migrations table: %v", err)
	}

	// Get list of applied migrations
	rows, err := DB.Query("SELECT migration_name FROM migrations")
	if err != nil {
		return fmt.Errorf("failed to query migrations: %v", err)
	}
	defer rows.Close()

	appliedMigrations := make(map[string]bool)
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return fmt.Errorf("failed to scan migration row: %v", err)
		}
		appliedMigrations[name] = true
	}

	// Get migration files
	migrationsDir := filepath.Join("database", "migrations")
	files, err := os.ReadDir(migrationsDir)
	if err != nil {
		return fmt.Errorf("failed to read migrations directory: %v", err)
	}

	// Filter and sort migration files
	var migrations []string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".sql") &&
			!strings.Contains(file.Name(), "rollback") {
			migrations = append(migrations, file.Name())
		}
	}
	sort.Strings(migrations)

	// Apply migrations
	for _, migration := range migrations {
		if appliedMigrations[migration] {
			fmt.Printf("Migration %s already applied\n", migration)
			continue
		}

		fmt.Printf("Applying migration: %s\n", migration)

		// Read migration file
		migrationPath := filepath.Join(migrationsDir, migration)
		content, err := os.ReadFile(migrationPath)
		if err != nil {
			return fmt.Errorf("failed to read migration file %s: %v", migration, err)
		}

		// Begin transaction
		tx, err := DB.Begin()
		if err != nil {
			return fmt.Errorf("failed to begin transaction: %v", err)
		}

		// Execute migration
		_, err = tx.Exec(string(content))
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to execute migration %s: %v", migration, err)
		}

		// Record migration
		_, err = tx.Exec("INSERT INTO migrations (migration_name) VALUES ($1)", migration)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to record migration %s: %v", migration, err)
		}

		// Commit transaction
		if err := tx.Commit(); err != nil {
			return fmt.Errorf("failed to commit transaction: %v", err)
		}

		fmt.Printf("Successfully applied migration: %s\n", migration)
	}

	return nil
}

// RollbackMigration rolls back the most recent migration
func RollbackMigration() error {
	// Ensure DB is connected
	if DB == nil {
		return fmt.Errorf("database connection not established")
	}

	// Get the most recent migration
	var migrationName string
	err := DB.QueryRow(`
		SELECT migration_name FROM migrations 
		ORDER BY applied_at DESC LIMIT 1
	`).Scan(&migrationName)
	if err != nil {
		return fmt.Errorf("failed to get latest migration: %v", err)
	}

	// Find corresponding rollback file
	rollbackName := strings.TrimSuffix(migrationName, ".sql") + "_rollback.sql"
	rollbackPath := filepath.Join("database", "migrations", rollbackName)

	// Check if rollback file exists
	if _, err := os.Stat(rollbackPath); os.IsNotExist(err) {
		return fmt.Errorf("rollback file %s does not exist", rollbackName)
	}

	// Read rollback file
	content, err := os.ReadFile(rollbackPath)
	if err != nil {
		return fmt.Errorf("failed to read rollback file %s: %v", rollbackName, err)
	}

	// Begin transaction
	tx, err := DB.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %v", err)
	}

	// Execute rollback
	_, err = tx.Exec(string(content))
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to execute rollback %s: %v", rollbackName, err)
	}

	// Remove migration record
	_, err = tx.Exec("DELETE FROM migrations WHERE migration_name = $1", migrationName)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to remove migration record %s: %v", migrationName, err)
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	fmt.Printf("Successfully rolled back migration: %s\n", migrationName)
	return nil
}
