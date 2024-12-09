import sql from "../database/database.js";

const addUser = async (email, password) => {
  await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE LOWER(email) = LOWER(${email})`;
  return rows;
};

export { addUser, findUserByEmail };