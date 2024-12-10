import sql from '$lib/server/database';
import crypto from 'crypto';

const generateSessionToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

const addUser = async (email: string, password: string) => {
  try {
    // Check if user already exists
    const existingUsers = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Insert new user
    const result = await sql`
      INSERT INTO users (email, password) 
      VALUES (${email}, ${password})
      RETURNING id
    `;

    if (result && result.length > 0) {
      return result[0].id; // Return the new user's ID
    } else {
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error('Error adding user:', error);
    
    // Distinguish between different types of errors
    if (error instanceof Error) {
      if (
        error.message.includes('unique constraint') || 
        error.message.includes('already exists')
      ) {
        throw new Error('Email is already registered');
      }
    }
    
    throw error;
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