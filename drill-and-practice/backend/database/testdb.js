import { sql } from "./database.js";

const testDbConnection = async () => {
    try {
        const result = await sql`SELECT 1`;

        console.log("Database connection test successful!");
        console.log("Result from DB query:", result);

        if (result.length > 0) {
            console.log("Database connection is working.");
        } else {
            console.log("No data returned from query.");
        }
    } catch (e) {
        console.error("Error connecting to the database:", e.message);
    }
};

testDbConnection();