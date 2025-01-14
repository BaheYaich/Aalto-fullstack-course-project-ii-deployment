import postgres from 'postgres';
import process from 'process';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const sql = postgres(databaseUrl, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  max: 10
});

export default sql;