import sql from '$lib/server/database';
import crypto from 'crypto';

const generateSessionToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

const addUser = async (email: string, hashedPassword: string) => {
  try {
    // Check if email already exists
    const existingUser = await sql`
      SELECT * FROM users 
      WHERE email = ${email}`;

    if (existingUser.length > 0) {
      throw new Error('Email already in use');
    }

    await sql`
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})`;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // Re-throw to be caught in the server action
  }
};

const findUserByEmail = async (email: string) => {
  const rows = await sql`SELECT * FROM users WHERE LOWER(email) = LOWER(${email})`;
  return rows[0];
};

const findUserBySessionToken = async (sessionToken: string) => {
  const rows = await sql`SELECT * FROM users WHERE session_token = ${sessionToken}`;
  return rows[0];
};

const setSessionTokenForUser = async (userId: number, sessionToken: string) => {
  await sql`UPDATE users SET session_token = ${sessionToken} WHERE id = ${userId}`;
};

const clearSessionToken = async (userId: number) => {
  await sql`UPDATE users SET session_token = NULL WHERE id = ${userId}`;
};

export { addUser, findUserByEmail, findUserBySessionToken, generateSessionToken, clearSessionToken, setSessionTokenForUser };