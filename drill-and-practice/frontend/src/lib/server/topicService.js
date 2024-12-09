import sql from '$lib/server/database';

export async function fetchTopics() {
    try {
      const topics = await sql`SELECT * FROM topics`;
      console.log("topicService: Fetched topics:", topics);
      return topics;
    } catch (error) {
      console.error("Error fetching topics from database:", error);
      throw error;
    }
  }

export const addTopic = async (name, user_id) => {
  try {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${user_id})`;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteTopic = async (id) => {
  try {
    await sql`DELETE FROM topics WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};