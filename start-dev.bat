@echo off
echo Checking prerequisites...

:: Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running or not installed.
    echo Please make sure Docker Desktop is installed and running.
    echo You can start Docker Desktop from the Start menu or system tray.
    echo.
    echo After starting Docker Desktop, wait a few seconds for it to initialize,
    echo then run this script again.
    pause
    exit /b 1
)

:: Check if docker-compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: docker-compose is not available.
    echo Please make sure Docker Desktop is properly installed.
    pause
    exit /b 1
)

:: Check if Go is installed
go version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Go is not installed or not in PATH.
    echo Please install Go from https://golang.org/dl/
    pause
    exit /b 1
)

echo Stopping any running services...

:: Stop any running Go processes
taskkill /F /IM "go.exe" /T >nul 2>&1

:: Stop any running Node processes for the frontend
taskkill /F /FI "WINDOWTITLE eq *npm*" >nul 2>&1

:: Stop existing Docker containers
docker-compose -f docker/docker-compose.yml down >nul 2>&1

echo Starting fresh development environment...

:: Start Docker services (PostgreSQL)
echo Starting PostgreSQL...
start cmd /k "docker-compose -f docker/docker-compose.yml up postgres"

:: Wait for PostgreSQL to be ready
echo Waiting for PostgreSQL to be ready...
timeout /t 10

:: Start backend (Go)
echo Starting backend...
start cmd /k "cd apps/backend && go mod download && go run cmd/main.go"

:: Start frontend
echo Starting frontend...
start cmd /k "cd apps/frontend && npm install && npm run dev"

echo Development environment is starting up!
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:8080
echo PostgreSQL will be available at: localhost:5432
echo.
echo Press Ctrl+C in each window to stop the services. 