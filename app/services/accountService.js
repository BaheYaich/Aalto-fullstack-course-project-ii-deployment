import { sql } from "../database/database.js";

const addAccount = async (name, userId) => {
    await sql`INSERT INTO accounts (name, user_id) VALUES (${name}, ${userId})`;
};

const findAccountsForUser = async (userId) => {
    return await sql`SELECT * FROM accounts WHERE user_id = ${userId}`;
};

const findAccountForUser = async (accountId, userId) => {
    return await sql`SELECT * FROM accounts WHERE id = ${accountId} AND user_id = ${userId}`;
};

const depositIntoAccountForUser = async (accountId, userId, amount) => {
    return await sql`UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId} AND user_id = ${userId}`;
};

const withdrawFromAccountForUser = async (accountId, userId, amount) => {

    const currentBalance = await sql`SELECT balance FROM accounts WHERE id = ${accountId} AND user_id = ${userId}`;

    if (currentBalance.length === 0 || currentBalance[0].balance < amount) {
        throw new Error("Insufficient funds");
    }

    return await sql`UPDATE accounts SET balance = balance - ${amount} WHERE id = ${accountId} AND user_id = ${userId}`;
}

const getAccountById = async (accountId) => {
    const result = await sql`SELECT * FROM accounts WHERE id = ${accountId}`;
    return result[0];
};

export { addAccount, findAccountForUser, findAccountsForUser, depositIntoAccountForUser, withdrawFromAccountForUser, getAccountById };