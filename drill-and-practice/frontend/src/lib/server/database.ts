import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const getDatabaseUrl = () => {
    // Try to get from SvelteKit's env first (which reads from process.env)
    const { PGUSER, PGPASSWORD, PGDATABASE } = env;
    
    if (!PGUSER || !PGPASSWORD || !PGDATABASE) {
        console.warn('Database credentials not found in environment');
        // During build, return dummy connection
        if (process.env.NODE_ENV === 'production') {
            return 'postgres://dummy';
        }
        throw new Error('Database credentials missing. Please check your environment variables.');
    }

    const host = process.env.DOCKER ? 'database' : 'localhost';
    return `postgres://${PGUSER}:${PGPASSWORD}@${host}:5432/${PGDATABASE}`;
};

const sql = postgres(getDatabaseUrl(), {
    ssl: false,
    idle_timeout: 2,
    max: 10
});

export default sql;