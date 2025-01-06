import sql from '$lib/server/database';

export async function fetchQuestionsByTopic(topicId: number) {
    const questions = await sql`
        SELECT * FROM questions 
        WHERE topic_id = ${topicId}`;
    return questions;
}

export const addQuestion = async (
    question_text: string, 
    user_id: number,
    topic_id: number,
) => {
    try {
        // Check if question already exists in this topic (case insensitive)
        const existingQuestion = await sql`
            SELECT * FROM questions 
            WHERE LOWER(question_text) = LOWER(${question_text})
            AND topic_id = ${topic_id}`;

        if (existingQuestion.length > 0) {
            return { success: false, error: 'This question already exists in this topic' };
        }

        await sql`
            INSERT INTO questions (question_text, user_id, topic_id) 
            VALUES (${question_text}, ${user_id}, ${topic_id})`;
        return { success: true };
    } catch (error) {
        console.error('Error adding question:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export const deleteQuestion = async (id: number, userId: number, isAdmin: boolean) => {
    try {
        // Fetch the question to check ownership
        const question = await sql`
            SELECT * FROM questions 
            WHERE id = ${id}`;

        if (question.length === 0) {
            return false;
        }

        // If not an admin, check if the user is the question owner
        if (!isAdmin && question[0].user_id !== userId) {
            return false;
        }

        await sql`DELETE FROM questions WHERE id = ${id}`;
        return true;
    } catch (error) {
        console.error('Error deleting question:', error);
        return false;
    }
};
