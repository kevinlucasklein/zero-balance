package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	// Get database connection details from environment variables or use defaults
	dbUser := getEnv("DB_USER", "zero_user")
	dbPass := getEnv("DB_PASS", "zero_pass")
	dbName := getEnv("DB_NAME", "zero_balance")
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
	sslMode := getEnv("DB_SSL_MODE", "disable")

	// Build connection string
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPass, dbName, sslMode,
	)

	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to the PostgreSQL database")

	DB = db
}

// InitDB connects to the database and runs migrations
func InitDB() {
	// Connect to the database
	ConnectDB()

	// Run migrations
	if err := RunMigrations(); err != nil {
		log.Printf("Error running migrations: %v", err)
	} else {
		fmt.Println("Database migrations applied successfully")
	}
}

// Helper function to get environment variable with fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
