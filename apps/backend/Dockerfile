FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go

# Use a smaller image for the final container
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Copy migrations directory
COPY --from=builder /app/database/migrations ./database/migrations

# Copy start script
COPY start.sh .
RUN chmod +x start.sh

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./start.sh"] 