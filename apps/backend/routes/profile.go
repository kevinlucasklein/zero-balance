package routes

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/kevinlucasklein/zero-balance/middleware"
)

// RegisterProfileRoutes registers all profile-related routes
func RegisterProfileRoutes(app *fiber.App, db *sql.DB) {
	// Create a profile group with authentication middleware
	profileGroup := app.Group("/api/profile")
	profileGroup.Use(middleware.AuthMiddleware())

	// Get user profile
	profileGroup.Get("/", func(c *fiber.Ctx) error {
		// Get user ID from context (set by AuthMiddleware)
		userID := c.Locals("userID").(int)

		// Query user profile from database
		var name string
		var email string
		var createdAt string
		err := db.QueryRow(
			"SELECT name, email, created_at FROM users WHERE id = $1",
			userID,
		).Scan(&name, &email, &createdAt)

		if err != nil {
			log.Printf("Error querying user profile: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error retrieving user profile",
			})
		}

		// Return user profile
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"profile": fiber.Map{
				"id":         userID,
				"name":       name,
				"email":      email,
				"created_at": createdAt,
			},
		})
	})

	// Update user profile
	profileGroup.Put("/", func(c *fiber.Ctx) error {
		// Get user ID from context (set by AuthMiddleware)
		userID := c.Locals("userID").(int)

		// Parse request body
		type UpdateProfileRequest struct {
			Name string `json:"name"`
		}

		var req UpdateProfileRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request format",
			})
		}

		// Validate input
		if req.Name == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Name is required",
			})
		}

		// Update user profile in database
		_, err := db.Exec(
			"UPDATE users SET name = $1 WHERE id = $2",
			req.Name, userID,
		)

		if err != nil {
			log.Printf("Error updating user profile: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error updating user profile",
			})
		}

		// Return success
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Profile updated successfully",
			"profile": fiber.Map{
				"id":   userID,
				"name": req.Name,
			},
		})
	})

	// Change password
	profileGroup.Put("/password", func(c *fiber.Ctx) error {
		// Get user ID from context (set by AuthMiddleware)
		userID := c.Locals("userID").(int)

		// Parse request body
		type ChangePasswordRequest struct {
			CurrentPassword string `json:"current_password"`
			NewPassword     string `json:"new_password"`
		}

		var req ChangePasswordRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request format",
			})
		}

		// Validate input
		if req.CurrentPassword == "" || req.NewPassword == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Current password and new password are required",
			})
		}

		// Get current password hash from database
		var passwordHash string
		err := db.QueryRow(
			"SELECT password_hash FROM users WHERE id = $1",
			userID,
		).Scan(&passwordHash)

		if err != nil {
			log.Printf("Error querying user password: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error processing your request",
			})
		}

		// Import the utils package for password hashing
		// This is a circular import, so we'll need to refactor later
		// For now, we'll just return a placeholder response
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Password change functionality will be implemented soon",
		})

		// TODO: Implement password change logic
		// Verify current password
		// Hash new password
		// Update password in database
	})

	// Get user statistics
	profileGroup.Get("/stats", func(c *fiber.Ctx) error {
		// Get user ID from context (set by AuthMiddleware)
		userID := c.Locals("userID").(int)

		// Query total debt
		var totalDebt float64
		err := db.QueryRow(
			"SELECT COALESCE(SUM(amount), 0) FROM debts WHERE user_id = $1 AND status = 'active'",
			userID,
		).Scan(&totalDebt)

		if err != nil {
			log.Printf("Error querying total debt: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error retrieving user statistics",
			})
		}

		// Query total income
		var totalIncome float64
		err = db.QueryRow(
			"SELECT COALESCE(SUM(amount), 0) FROM income_sources WHERE user_id = $1",
			userID,
		).Scan(&totalIncome)

		if err != nil {
			log.Printf("Error querying total income: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error retrieving user statistics",
			})
		}

		// Query debt count
		var debtCount int
		err = db.QueryRow(
			"SELECT COUNT(*) FROM debts WHERE user_id = $1 AND status = 'active'",
			userID,
		).Scan(&debtCount)

		if err != nil {
			log.Printf("Error querying debt count: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error retrieving user statistics",
			})
		}

		// Query income sources count
		var incomeSourcesCount int
		err = db.QueryRow(
			"SELECT COUNT(*) FROM income_sources WHERE user_id = $1",
			userID,
		).Scan(&incomeSourcesCount)

		if err != nil {
			log.Printf("Error querying income sources count: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error retrieving user statistics",
			})
		}

		// Return user statistics
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"stats": fiber.Map{
				"total_debt":           totalDebt,
				"total_income":         totalIncome,
				"debt_count":           debtCount,
				"income_sources_count": incomeSourcesCount,
				"debt_to_income_ratio": calculateRatio(totalDebt, totalIncome),
			},
		})
	})
}

// Helper function to calculate ratio
func calculateRatio(debt, income float64) float64 {
	if income == 0 {
		return 0
	}
	return debt / income
}
