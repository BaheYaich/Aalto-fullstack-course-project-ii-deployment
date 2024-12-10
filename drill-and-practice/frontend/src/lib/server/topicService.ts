import sql from '$lib/server/database';

export async function fetchTopics() {
    try {
      const topics = await sql`SELECT * FROM topics`;
      return topics;
    } catch (error) {
      console.error("Error fetching topics from database:", error);
      throw error;
    }
  }

export const addTopic = async (name: string, user_id: number) => {
  try {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${user_id})`;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteTopic = async (id: number) => {
  try {
    await sql`DELETE FROM topics WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};