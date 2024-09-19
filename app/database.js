import { postgres } from "./deps.js";

const sql = postgres({}); // injecting config from env

const rows = await sql`SELECT * FROM addresses`;

rows.forEach((row) => {
    console.log(row.address);
});

export { sql };
