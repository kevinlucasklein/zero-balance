package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

// Default secret key for JWT - should be overridden by environment variable
var jwtSecret = []byte("zero-balance-secret-key")

func init() {
	// Use environment variable for JWT secret if available
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		jwtSecret = []byte(secret)
	}
}

// HashPassword hashes a plain password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash compares a plain password with a hashed password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// GenerateJWT generates a JWT token for a user
func GenerateJWT(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // Token expires in 7 days
	})

	return token.SignedString(jwtSecret)
}

// ValidateJWT validates a JWT token and returns the user ID
func ValidateJWT(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := int(claims["user_id"].(float64))
		return userID, nil
	}

	return 0, jwt.ErrSignatureInvalid
}
