import { sql } from "../database/database.js";

const getAllGames = async () => {
    return await sql`SELECT * FROM games`;
};

const getGame = async (gameId) => {
    const rows = await sql`SELECT * FROM games WHERE id = ${gameId}`;
    return rows[0];
}

const getGameRatings = async (gameId) => {
    return await sql`SELECT * FROM ratings WHERE game_id = ${gameId}`;
}

const addGame = async (name) => {
    try {
        console.log("Inserting game:", { name });
        await sql`INSERT INTO games (name) VALUES (${name})`;
        return true;
    } catch (error) {
        console.error("Error inserting game:", error);
        return false;
    }
};

const addRating = async (rating, gameId) => {
    try {
        console.log("Inserting game rating:", { rating, gameId });
        await sql`INSERT INTO ratings (rating, game_id) VALUES (${rating}, ${gameId})`;
        return true;
    } catch (error) {
        console.error("Error inserting game rating:", error);
        return false;
    }
};

const deleteGame = async (gameId) => {
    return await sql`DELETE FROM games WHERE id = ${gameId}`
}

export { getAllGames, getGame, addGame, addRating, deleteGame, getGameRatings }