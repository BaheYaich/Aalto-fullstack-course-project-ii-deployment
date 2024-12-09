import sql from '$lib/server/database';
import crypto from 'crypto';

const generateSessionToken = () => {
  return crypto.randomBytes(64).toString('hex'); // Creates a secure random token
};

const addUser = async (email, password) => {
  await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE LOWER(email) = LOWER(${email})`;
  return rows[0]; // Return the first matching user
};

const findUserBySessionToken = async (sessionToken) => {
  const rows = await sql`SELECT * FROM users WHERE session_token = ${sessionToken}`;
  console.log("Finding user by session token:", sessionToken, rows);
  return rows[0];
};

const setSessionTokenForUser = async (userId, sessionToken) => {
  console.log("Saving session token:", sessionToken);
  await sql`UPDATE users SET session_token = ${sessionToken} WHERE id = ${userId}`;
};

const clearSessionToken = async (userId) => {
  await sql`UPDATE users SET session_token = NULL WHERE id = ${userId}`;
};

export { addUser, findUserByEmail, findUserBySessionToken, generateSessionToken, clearSessionToken, setSessionTokenForUser };