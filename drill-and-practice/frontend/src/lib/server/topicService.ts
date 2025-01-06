import sql from '$lib/server/database';
import type { Topic } from '$lib/types';

export async function fetchTopics() {
    try {
      const topics = await sql`SELECT * FROM topics ORDER BY name ASC`;
      return topics;
    } catch (error) {
      console.error("Error fetching topics from database:", error);
      throw error;
    }
}

export async function fetchTopicById(id: number): Promise<Topic | null> {
    try {
        const result = await sql`SELECT * FROM topics WHERE id = ${id}`;
        return (result[0] as Topic) || null;
    } catch (error) {
        console.error("Error fetching topic:", error);
        return null;
    }
}

export const addTopic = async (name: string, userId: number) => {
    try {
        // Check if topic already exists (case insensitive)
        const existingTopic = await sql`
            SELECT * FROM topics 
            WHERE LOWER(name) = LOWER(${name})`;

        if (existingTopic.length > 0) {
            return { success: false, error: 'Topic already exists' };
        }

        await sql`
            INSERT INTO topics (name, user_id) 
            VALUES (${name}, ${userId})`;
        return { success: true };
    } catch (error) {
        console.error('Error adding topic:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export const deleteTopic = async (id: number) => {
    try {
        await sql.begin(async (sql) => {
            await sql`DELETE FROM topics WHERE id = ${id}`;
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};