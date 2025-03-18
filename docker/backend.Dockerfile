FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum
COPY apps/backend/go.mod apps/backend/go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY apps/backend/ ./

# Build the application
RUN go build -o main cmd/main.go

# Use a smaller image for the final container
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .
COPY --from=builder /app/database/migrations ./database/migrations

# Set environment variables
ENV PORT=8080 \
    DB_HOST=postgres \
    DB_PORT=5432 \
    DB_SSL_MODE=disable \
    MIGRATIONS_PATH=database/migrations

# Database credentials will be provided at runtime via environment variables
# DO NOT hardcode credentials in the Dockerfile

# Expose the port
EXPOSE 8080

# Run the application
CMD ["./main"] 