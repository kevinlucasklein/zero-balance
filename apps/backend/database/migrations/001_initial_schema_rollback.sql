-- ZeroBalance Database Schema Rollback

-- Drop indexes
DROP INDEX IF EXISTS idx_scheduled_payments_debt_id;
DROP INDEX IF EXISTS idx_scheduled_payments_user_id;
DROP INDEX IF EXISTS idx_payments_debt_id;
DROP INDEX IF EXISTS idx_payments_user_id;
DROP INDEX IF EXISTS idx_debts_user_id;
DROP INDEX IF EXISTS idx_income_sources_user_id;

-- Drop tables (in reverse order of creation to handle dependencies)
DROP TABLE IF EXISTS scheduled_payments;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS debts;
DROP TABLE IF EXISTS income_sources;
DROP TABLE IF EXISTS users; 