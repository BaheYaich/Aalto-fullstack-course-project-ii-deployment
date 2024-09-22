import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

const sql = postgres({});

const create = async (name, rating) => {
    await sql`INSERT INTO songs (name, rating) VALUES (${name}, ${rating})`;
};

const findAll = async () => {
    return await sql`SELECT * FROM songs`;
};
const deleteById = async (id) => {
    try {
        await sql`DELETE FROM songs WHERE id = ${id}`;
    } catch (e) {
        console.log(e);
    }
};

export { create, deleteById, findAll };
