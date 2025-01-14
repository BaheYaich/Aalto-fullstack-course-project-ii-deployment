import postgres from 'postgres';

const getDatabaseUrl = () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.error('DATABASE_URL is not set');
        return 'postgres://localhost:5432/postgres'; // fallback for dev
    }
    return url;
};

const sql = postgres(getDatabaseUrl(), {
    ssl: true,
    idle_timeout: 2,
    max_lifetime: 60 * 30,
    max: 10
});

export default sql;