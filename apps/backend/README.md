# ZeroBalance Backend

This is the backend API for the ZeroBalance application, built with Go and PostgreSQL.

## Local Development

1. Make sure you have Go installed (version 1.16 or higher)
2. Install PostgreSQL and create a database for the application
3. Set up environment variables (see below) for database connection
4. Run the application:

```bash
go run cmd/main.go
```

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port to run the server on (default: 8080)
- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USER`: PostgreSQL user
- `DB_PASS`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name
- `DB_SSL_MODE`: PostgreSQL SSL mode (default: disable)
- `MIGRATIONS_PATH`: Path to migration files (optional)

For local development, you can create a `.env` file in the root directory with these variables. **Do not commit this file to version control.**

Example `.env` file (replace with your own values):
```
DB_USER=your_db_user
DB_PASS=your_secure_password
DB_NAME=your_db_name
```

## Deployment to Railway

1. Create a new project in Railway
2. Add a PostgreSQL database service
3. Add a new service from GitHub repository
4. Set the root directory to `apps/backend`
5. Railway will automatically detect the Dockerfile and deploy the application
6. Connect the PostgreSQL service to your application service
7. Set any required environment variables in the Railway dashboard (Railway will automatically provide database connection variables)

## Security Best Practices

- Never commit sensitive information like database credentials to version control
- Use environment variables for all sensitive configuration
- For local development, use a `.env` file that is excluded from git (add to `.gitignore`)
- In production, use the platform's secure environment variable management (Railway provides this)
- Regularly rotate database credentials

## Database Migrations

Database migrations are automatically applied when the application starts. The migrations are located in the `database/migrations` directory.

To add a new migration:

1. Create a new SQL file with a numeric prefix higher than existing migrations (e.g., `002_add_new_table.sql`)
2. Create a corresponding rollback file (e.g., `002_add_new_table_rollback.sql`)
3. The migration will be automatically applied the next time the application starts

## API Endpoints

- `GET /`: Health check endpoint 