package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/kevinlucasklein/zero-balance/database"
	"github.com/kevinlucasklein/zero-balance/routes"
)

func main() {
	// Check if debug mode is enabled
	debugMode := getEnvAsBool("DEBUG", false)

	// Print environment information
	fmt.Println("Starting ZeroBalance API...")

	// Print environment variables in debug mode
	if debugMode {
		fmt.Println("Environment variables:")
		fmt.Printf("PORT: %s\n", getEnvOrDefault("PORT", "8080"))
		fmt.Printf("DB_HOST: %s\n", getEnvOrDefault("DB_HOST", "localhost"))
		fmt.Printf("DB_PORT: %s\n", getEnvOrDefault("DB_PORT", "5432"))
		fmt.Printf("DB_USER: %s\n", getEnvOrDefault("DB_USER", ""))
		fmt.Printf("DB_NAME: %s\n", getEnvOrDefault("DB_NAME", ""))
		fmt.Printf("DB_SSL_MODE: %s\n", getEnvOrDefault("DB_SSL_MODE", "disable"))

		// Check for Railway-specific PostgreSQL environment variables
		fmt.Println("Railway PostgreSQL environment variables:")
		fmt.Printf("PGHOST: %s\n", getEnvOrDefault("PGHOST", ""))
		fmt.Printf("PGPORT: %s\n", getEnvOrDefault("PGPORT", ""))
		fmt.Printf("PGUSER: %s\n", getEnvOrDefault("PGUSER", ""))
		fmt.Printf("PGDATABASE: %s\n", getEnvOrDefault("PGDATABASE", ""))
		fmt.Printf("PGSSLMODE: %s\n", getEnvOrDefault("PGSSLMODE", ""))
	}

	// Initialize database with error handling
	fmt.Println("Initializing database connection...")
	err := initDatabaseWithRetry(5)
	if err != nil {
		log.Printf("WARNING: Failed to initialize database: %v", err)
		log.Println("Continuing without database connection")
	} else {
		fmt.Println("Database initialized successfully")
	}

	// Create Fiber app
	app := fiber.New(fiber.Config{
		// Add error handling
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			// Log the error
			log.Printf("Error: %v", err)

			// Return a 500 response
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Internal Server Error",
			})
		},
	})

	// Add middleware
	app.Use(recover.New()) // Recover from panics
	app.Use(logger.New())  // Log requests

	// Add CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: getCorsOrigins(),
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE",
	}))

	// Root endpoint for health checks
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":    "ok",
			"message":   "ZeroBalance API is running!",
			"timestamp": time.Now().Format(time.RFC3339),
		})
	})

	// Add a debug endpoint
	app.Get("/debug", func(c *fiber.Ctx) error {
		dbStatus := "not connected"
		if database.DB != nil {
			if err := database.DB.Ping(); err == nil {
				dbStatus = "connected"
			} else {
				dbStatus = fmt.Sprintf("error: %v", err)
			}
		}

		return c.JSON(fiber.Map{
			"status":    "ok",
			"db_status": dbStatus,
			"env":       getEnvironmentVariables(),
		})
	})

	// Register authentication routes
	if database.DB != nil {
		routes.RegisterAuthRoutes(app, database.DB)
	} else {
		log.Println("WARNING: Skipping auth routes registration due to missing database connection")
	}

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	fmt.Printf("Starting server on port %s...\n", port)
	log.Fatal(app.Listen(":" + port))
}

// Helper function to get environment variable with default value
func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// Helper function to get environment variable as boolean
func getEnvAsBool(key string, defaultValue bool) bool {
	valStr := os.Getenv(key)
	if valStr == "" {
		return defaultValue
	}

	val, err := strconv.ParseBool(valStr)
	if err != nil {
		return defaultValue
	}

	return val
}

// Initialize database with retry
func initDatabaseWithRetry(maxRetries int) error {
	var err error
	for i := 0; i < maxRetries; i++ {
		// Try to initialize database with migrations
		err = database.InitDB()

		// If successful, return nil
		if err == nil {
			return nil
		}

		// Log error and retry
		log.Printf("Failed to initialize database (attempt %d/%d): %v", i+1, maxRetries, err)

		// Wait before retrying
		if i < maxRetries-1 {
			time.Sleep(time.Second * 2)
		}
	}

	return err
}

// Get all environment variables for debugging
func getEnvironmentVariables() map[string]string {
	env := make(map[string]string)
	for _, e := range os.Environ() {
		pair := make([]string, 2)
		for i := 0; i < len(e); i++ {
			if e[i] == '=' {
				pair[0] = e[:i]
				pair[1] = e[i+1:]
				break
			}
		}

		// Skip sensitive environment variables
		if pair[0] == "DB_PASS" || pair[0] == "DB_PASSWORD" || pair[0] == "PGPASSWORD" {
			env[pair[0]] = "[REDACTED]"
		} else {
			env[pair[0]] = pair[1]
		}
	}
	return env
}

// Helper function to get CORS origins based on environment
func getCorsOrigins() string {
	// Check if we're in production
	if os.Getenv("ENVIRONMENT") == "production" || os.Getenv("RAILWAY_ENVIRONMENT_NAME") == "production" {
		// Use specific origins in production
		origins := getEnvOrDefault("CORS_ORIGINS", "https://zero-balance.vercel.app")
		fmt.Printf("Running in production mode. CORS origins: %s\n", origins)

		// If there are multiple origins, return them as-is (Fiber will handle comma-separated lists)
		// This allows setting CORS_ORIGINS=https://domain1.com,https://domain2.com
		return origins
	}

	// In development, allow all origins
	fmt.Println("Running in development mode. CORS origins: *")
	return "*"
}
