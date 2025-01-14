import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const getDatabaseUrl = () => {
    // For Vercel deployment
    if (env.DATABASE_URL) {
        return env.DATABASE_URL;
    }

    // For local development
    const { PGUSER, PGPASSWORD, PGDATABASE } = env;
    if (!PGUSER || !PGPASSWORD || !PGDATABASE) {
        throw new Error('Database credentials missing. Please check your environment variables.');
    }

    const host = env.DOCKER ? 'database' : 'localhost';
    return `postgres://${PGUSER}:${PGPASSWORD}@${host}:5432/${PGDATABASE}`;
};

const sql = postgres(getDatabaseUrl(), {
    ssl: env.NODE_ENV === 'production',
    idle_timeout: 2,
    max: 10
});

export default sql;