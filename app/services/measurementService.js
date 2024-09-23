import { sql } from "../database/database.js";

const isEmpty = async () => {
    const count =
        await sql`SELECT COUNT(measurement) AS count FROM measurements`;
    console.log(count[0].count);
    return count[0].count;
};

const averageMeasurement = async () => {
    const average =
        await sql`SELECT AVG(measurement) AS average FROM measurements WHERE measurement >= 0 AND measurement <= 1000`;
    return average[0].average;
};

export { averageMeasurement, isEmpty };
