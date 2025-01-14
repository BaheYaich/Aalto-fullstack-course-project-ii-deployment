import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

let sql;

const getDatabaseConnection = () => {
    if (!sql) {
        const getDatabaseUrl = () => {
            if (process.env.DATABASE_URL) {
                return process.env.DATABASE_URL;
            }

            const { PGUSER, PGPASSWORD, PGDATABASE, PGHOST } = process.env;
            if (!PGUSER || !PGPASSWORD || !PGDATABASE || !PGHOST) {
                throw new Error('Database credentials missing. Please check your environment variables.');
            }

            return `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}`;
        };

        sql = postgres(getDatabaseUrl(), {
            ssl: {
                rejectUnauthorized: false
            },
            idle_timeout: 2,
            max: 10
        });
    }
    return sql;
};

export default getDatabaseConnection;