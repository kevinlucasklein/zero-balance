# Zero Balance

A financial management application.

## Development Setup

### Prerequisites
- Go (v1.21 or later)
- Node.js (v18 or later) for frontend
- Docker Desktop for Windows
- Git

### Docker Desktop Setup

1. Download and install Docker Desktop for Windows from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. During installation:
   - Enable WSL 2 if prompted
   - Allow Docker Desktop to install required Windows components
   - Restart your computer if requested

3. After installation:
   - Start Docker Desktop from the Start menu
   - Wait for Docker Desktop to finish starting (the whale icon in the system tray will stop animating)
   - Make sure Docker Desktop is running before starting the development environment

### Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd zero-balance
```

2. Start the development environment:

On Windows:
```bash
start-dev.bat
```

On Unix-based systems (Linux/MacOS):
```bash
chmod +x start-dev.sh
./start-dev.sh
```

This will start:
- PostgreSQL database (via Docker)
- Backend server (http://localhost:8080)
- Frontend development server (http://localhost:3000)

### Manual Start

If you prefer to start services manually:

1. Start the database:
```bash
docker-compose -f docker/docker-compose.yml up postgres
```

2. In a new terminal, start the backend:
```bash
cd apps/backend
go mod download
go run cmd/main.go
```

3. In another terminal, start the frontend:
```bash
cd apps/frontend
npm install
npm run dev
```

### Stopping the Services

- To stop all services started by the script, press Ctrl+C in each terminal window
- To stop Docker services: `docker-compose -f docker/docker-compose.yml down`

### Troubleshooting

If you encounter Docker-related errors:

1. Make sure Docker Desktop is running
   - Look for the Docker whale icon in your system tray
   - If it's not there, start Docker Desktop from the Start menu
   - Wait a few seconds for Docker to fully initialize

2. If Docker Desktop isn't starting:
   - Check if WSL 2 is properly installed and enabled
   - Try restarting Docker Desktop
   - If problems persist, try restarting your computer

3. If you see "unable to get image" errors:
   - Make sure you have a working internet connection
   - Try running `docker pull postgres:15` manually
   - Check if your Docker Desktop settings allow image downloads

4. If you encounter Go-related errors:
   - Make sure Go is installed and in your PATH
   - Try running `go version` to verify the installation
   - Run `go mod download` manually if dependencies aren't downloading
   - Try running `go run apps/backend/cmd/main.go` from the project root if you encounter path issues

## Project Structure

```
zero-balance/
├── apps/
│   ├── backend/     # Go backend API service
│   │   └── cmd/     # Contains main.go entry point
│   └── frontend/    # React/Vite frontend application
├── docker/          # Docker configuration files
├── infra/          # Infrastructure configuration
└── packages/       # Shared packages
``` 