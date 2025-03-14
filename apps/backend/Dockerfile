FROM golang:1.23-alpine AS builder

# Set Go environment variables
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

# Copy go.mod and go.sum first for better caching
COPY go.mod go.sum ./

# Try to download dependencies
RUN go mod download || echo "Failed to download dependencies, continuing anyway"

# Copy the source code
COPY . .

# Build the application
RUN go build -o main ./cmd/main.go

# Use a smaller image for the final container
FROM alpine:latest

# Add necessary packages
RUN apk --no-cache add ca-certificates tzdata curl

# Set timezone to UTC
ENV TZ=UTC

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /build/main .

# Copy migrations directory
COPY --from=builder /build/database/migrations ./database/migrations

# Create and set up the start script with better logging
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "Starting ZeroBalance API..."' >> start.sh && \
    echo 'echo "Container environment:"' >> start.sh && \
    echo 'env | grep -v PASSWORD | grep -v PASS' >> start.sh && \
    echo 'chmod +x ./main' >> start.sh && \
    echo 'echo "Running application..."' >> start.sh && \
    echo './main' >> start.sh && \
    chmod +x start.sh

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./start.sh"] 