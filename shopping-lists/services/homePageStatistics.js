import { sql } from "../database/database.js";

const countAllLists = async () => {
    const count = await sql`SELECT COUNT(id) AS count FROM shopping_lists`;
    return count[0].count;
};

const countAllItems = async () => {
    const count = await sql`SELECT COUNT(id) AS count FROM shopping_list_items`;
    return count[0].count;
};

export { countAllItems, countAllLists };
