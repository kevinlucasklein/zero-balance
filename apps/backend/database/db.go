package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	connStr := "user=zero_user password=zero_pass dbname=zero_balance sslmode=disable"
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
