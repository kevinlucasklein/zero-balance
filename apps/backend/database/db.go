package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() error {
	// Check for Railway-specific PostgreSQL environment variables first
	dbUser := getEnvWithFallbacks("DB_USER", "PGUSER", "zero_user")
	dbPass := getEnvWithFallbacks("DB_PASS", "PGPASSWORD", "zero_pass")
	dbName := getEnvWithFallbacks("DB_NAME", "PGDATABASE", "zero_balance")
	dbHost := getEnvWithFallbacks("DB_HOST", "PGHOST", "localhost")
	dbPort := getEnvWithFallbacks("DB_PORT", "PGPORT", "5432")
	sslMode := getEnv("DB_SSL_MODE", "disable")

	// Build connection string
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s connect_timeout=5",
		dbHost, dbPort, dbUser, dbPass, dbName, sslMode,
	)

	// Log connection attempt (without password)
	log.Printf("Connecting to PostgreSQL at %s:%s/%s (user: %s, sslmode: %s)",
		dbHost, dbPort, dbName, dbUser, sslMode)

	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to open database connection: %v", err)
	}

	// Set connection pool settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(time.Minute * 5)

	// Test the connection
	err = db.Ping()
	if err != nil {
		return fmt.Errorf("failed to ping database: %v", err)
	}

	log.Println("Connected to the PostgreSQL database")

	DB = db
	return nil
}

// InitDB connects to the database and runs migrations
func InitDB() error {
	// Connect to the database
	err := ConnectDB()
	if err != nil {
		return fmt.Errorf("database connection failed: %v", err)
	}

	// Run migrations
	if err := RunMigrations(); err != nil {
		return fmt.Errorf("error running migrations: %v", err)
	}

	log.Println("Database migrations applied successfully")
	return nil
}

// Helper function to get environment variable with fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}

// Helper function to get environment variable with multiple fallbacks
func getEnvWithFallbacks(key1, key2, fallback string) string {
	// Try first key
	if value, exists := os.LookupEnv(key1); exists && value != "" {
		return value
	}

	// Try second key
	if value, exists := os.LookupEnv(key2); exists && value != "" {
		return value
	}

	// Return fallback
	return fallback
}
