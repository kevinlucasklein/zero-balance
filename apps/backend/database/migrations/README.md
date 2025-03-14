# ZeroBalance Database Migrations

This directory contains SQL migration files for the ZeroBalance application database.

## Migration Files

- `001_initial_schema.sql`: Creates the initial database schema with all required tables
- `001_initial_schema_rollback.sql`: Rolls back the initial schema migration

## Database Schema

The ZeroBalance database consists of the following tables:

1. **users**: Stores user account information
   - `id`: Primary key
   - `name`: User's name
   - `email`: User's email (unique)
   - `password_hash`: Hashed password
   - `created_at`: Timestamp of account creation

2. **income_sources**: Tracks user income sources
   - `id`: Primary key
   - `user_id`: Foreign key to users table
   - `source_name`: Name of income source
   - `amount`: Income amount
   - `frequency`: Payment frequency (weekly, biweekly, monthly, irregular)
   - `next_pay_date`: Date of next payment
   - `created_at`: Timestamp of record creation

3. **debts**: Stores user debts
   - `id`: Primary key
   - `user_id`: Foreign key to users table
   - `creditor_name`: Name of creditor
   - `amount`: Total debt amount
   - `interest_rate`: Interest rate percentage
   - `minimum_payment`: Minimum required payment
   - `due_date`: Monthly due date
   - `status`: Debt status (active, paid_off)
   - `created_at`: Timestamp of record creation

4. **payments**: Tracks payments made toward debts
   - `id`: Primary key
   - `user_id`: Foreign key to users table
   - `debt_id`: Foreign key to debts table
   - `amount`: Payment amount
   - `payment_date`: Date of payment
   - `method`: Payment method (bank_transfer, credit_card, cash, other)

5. **scheduled_payments**: AI-generated payment recommendations
   - `id`: Primary key
   - `user_id`: Foreign key to users table
   - `debt_id`: Foreign key to debts table
   - `recommended_amount`: AI-recommended payment amount
   - `scheduled_date`: Recommended payment date
   - `status`: Payment status (pending, completed, skipped)
   - `created_at`: Timestamp of record creation

## How to Apply Migrations

Migrations are automatically applied when the application starts. The `InitDB()` function in `database/db.go` handles this process.

To manually apply migrations, you can call the `RunMigrations()` function from your code:

```go
import "your-app/database"

func main() {
    database.ConnectDB()
    err := database.RunMigrations()
    if err != nil {
        log.Fatalf("Failed to run migrations: %v", err)
    }
}
```

## How to Rollback Migrations

To rollback the most recent migration, call the `RollbackMigration()` function:

```go
import "your-app/database"

func main() {
    database.ConnectDB()
    err := database.RollbackMigration()
    if err != nil {
        log.Fatalf("Failed to rollback migration: %v", err)
    }
}
```

## Adding New Migrations

To add a new migration:

1. Create a new SQL file with a numeric prefix higher than existing migrations (e.g., `002_add_new_table.sql`)
2. Create a corresponding rollback file (e.g., `002_add_new_table_rollback.sql`)
3. The migration will be automatically applied the next time the application starts 