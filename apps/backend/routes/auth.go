package routes

import (
	"database/sql"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/kevinlucasklein/zero-balance/utils"
)

// RegisterAuthRoutes registers all authentication-related routes
func RegisterAuthRoutes(app *fiber.App, db *sql.DB) {
	// User signup endpoint
	app.Post("/api/auth/signup", func(c *fiber.Ctx) error {
		// Parse request body
		type SignupRequest struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		var req SignupRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request format",
			})
		}

		// Validate input
		if req.Name == "" || req.Email == "" || req.Password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Name, email, and password are required",
			})
		}

		// Hash the password
		hashedPassword, err := utils.HashPassword(req.Password)
		if err != nil {
			log.Printf("Error hashing password: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error processing your request",
			})
		}

		// Insert user into database
		var userID int
		err = db.QueryRow(
			"INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
			req.Name, req.Email, hashedPassword,
		).Scan(&userID)

		if err != nil {
			log.Printf("Error creating user: %v", err)
			// Check for duplicate email
			if err.Error() == "pq: duplicate key value violates unique constraint \"users_email_key\"" {
				return c.Status(fiber.StatusConflict).JSON(fiber.Map{
					"error": "Email already in use",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error creating user",
			})
		}

		// Generate JWT token
		token, err := utils.GenerateJWT(userID)
		if err != nil {
			log.Printf("Error generating token: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error generating authentication token",
			})
		}

		// Return success with token
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"message": "User registered successfully",
			"token":   token,
			"user": fiber.Map{
				"id":    userID,
				"name":  req.Name,
				"email": req.Email,
			},
		})
	})

	// User login endpoint
	app.Post("/api/auth/login", func(c *fiber.Ctx) error {
		// Parse request body
		type LoginRequest struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		var req LoginRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request format",
			})
		}

		// Validate input
		if req.Email == "" || req.Password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Email and password are required",
			})
		}

		// Query user from database
		var userID int
		var name string
		var email string
		var hashedPassword string
		err := db.QueryRow(
			"SELECT id, name, email, password_hash FROM users WHERE email = $1",
			req.Email,
		).Scan(&userID, &name, &email, &hashedPassword)

		if err != nil {
			if err == sql.ErrNoRows {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "Invalid email or password",
				})
			}
			log.Printf("Error querying user: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error processing your request",
			})
		}

		// Verify password
		if !utils.CheckPasswordHash(req.Password, hashedPassword) {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid email or password",
			})
		}

		// Generate JWT token
		token, err := utils.GenerateJWT(userID)
		if err != nil {
			log.Printf("Error generating token: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error generating authentication token",
			})
		}

		// Return success with token
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Login successful",
			"token":   token,
			"user": fiber.Map{
				"id":    userID,
				"name":  name,
				"email": email,
			},
		})
	})

	// Get current user endpoint (protected)
	app.Get("/api/auth/me", func(c *fiber.Ctx) error {
		// Get the Authorization header
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Authorization header is required",
			})
		}

		// Extract the token
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid authorization format",
			})
		}

		// Validate the token
		userID, err := utils.ValidateJWT(tokenParts[1])
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid or expired token",
			})
		}

		// Query user from database
		var name string
		var email string
		err = db.QueryRow(
			"SELECT name, email FROM users WHERE id = $1",
			userID,
		).Scan(&name, &email)

		if err != nil {
			if err == sql.ErrNoRows {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "User not found",
				})
			}
			log.Printf("Error querying user: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error processing your request",
			})
		}

		// Return user data
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"user": fiber.Map{
				"id":    userID,
				"name":  name,
				"email": email,
			},
		})
	})
}
