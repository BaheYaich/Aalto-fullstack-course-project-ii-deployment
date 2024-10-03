import { sql } from "../database/database.js";

const createItem = async (listId, name) => {
    await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`;
};

const fetchExistingItems = async (listId) => {
    const rows = await sql`SELECT * 
    FROM shopping_list_items 
    WHERE shopping_list_id = ${listId}
    ORDER BY Collected ASC, name ASC;`;

    if (rows && rows.length > 0) {
        return rows;
    }

    return false;
};

const fetchItem = async (id) => {
    const row = await sql`SELECT * FROM shopping_list_items
    WHERE id = ${id}`;
    return row[0];
};

const markAsCollected = async (id) => {
    await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${id}`;
};

const markAsNotCollected = async (id) => {
    await sql`UPDATE shopping_list_items
    SET collected = false WHERE id = ${id}`;
};

export {
    createItem,
    fetchExistingItems,
    fetchItem,
    markAsCollected,
    markAsNotCollected,
};
