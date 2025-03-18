#!/bin/bash

echo "Starting development environment..."

# Start Docker services (PostgreSQL)
echo "Starting PostgreSQL..."
docker-compose -f docker/docker-compose.yml up postgres -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Start backend (Go)
echo "Starting backend..."
cd apps/backend && go mod download && go run cmd/main.go &
cd ../..

# Start frontend
echo "Starting frontend..."
cd apps/frontend && npm install && npm run dev &
cd ../..

echo "Development environment is starting up!"
echo
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:8080"
echo "PostgreSQL will be available at: localhost:5432"
echo
echo "Press Ctrl+C to stop all services." 