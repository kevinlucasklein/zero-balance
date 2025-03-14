package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/kevinlucasklein/zero-balance/utils"
)

// AuthMiddleware protects routes by requiring a valid JWT token
func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get the Authorization header
		authHeader := c.Get("Authorization")

		// Check if the header is empty
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Authorization header is required",
			})
		}

		// Extract the token from the header (Bearer token)
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid authorization format, expected 'Bearer {token}'",
			})
		}

		// Validate the token
		userID, err := utils.ValidateJWT(tokenParts[1])
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid or expired token",
			})
		}

		// Store the user ID in the context for later use
		c.Locals("userID", userID)

		// Continue to the next middleware or route handler
		return c.Next()
	}
}
