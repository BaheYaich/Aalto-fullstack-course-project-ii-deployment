import { sql } from "../database/database.js";

const getAllSongs = async () => {
    return await sql`SELECT * FROM songs`;
};

const getSong = async (songId) => {
    const rows = await sql`SELECT * FROM songs WHERE id = ${songId}`;
    return rows[0];
}

const addSong = async (name, rating) => {
    try {
        console.log("Inserting song:", { name, rating });
        await sql`INSERT INTO songs (name, rating) VALUES (${name}, ${rating})`;
        return true;
    } catch (error) {
        console.error("Error inserting song:", error);
        return false;
    }
};

const deleteSong = async (songId) => {
    return await sql`DELETE FROM songs WHERE id = ${songId}`
}

export { getAllSongs, getSong, addSong, deleteSong }