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
	// Get database connection details from environment variables or use defaults
	dbUser := getEnv("DB_USER", "zero_user")
	dbPass := getEnv("DB_PASS", "zero_pass")
	dbName := getEnv("DB_NAME", "zero_balance")
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
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
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
