import sql from '$lib/server/database';
import { validateQuestionText, isAuthorizedToDelete } from './services/pure/questionService';

// Re-export pure functions
export { validateQuestionText, isAuthorizedToDelete };

// Database operations
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
        if (!validateQuestionText(question_text)) {
            return { success: false, error: 'Invalid question format' };
        }

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
        const question = await sql`
            SELECT * FROM questions 
            WHERE id = ${id}`;

        if (question.length === 0) {
            return { success: false, error: 'Question not found' };
        }

        if (!isAuthorizedToDelete(question[0].user_id, userId, isAdmin)) {
            return { success: false, error: 'Not authorized to delete this question' };
        }

        await sql`DELETE FROM questions WHERE id = ${id}`;
        return { success: true };
    } catch (error) {
        console.error('Error deleting question:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export async function getQuestionById(id: number) {
    const result = await sql`
        SELECT * FROM questions WHERE id = ${id}
    `;
    return result[0];
}

export const fetchQuestionById = async (questionId: number) => {
    try {
        const result = await sql`
            SELECT question_text 
            FROM questions 
            WHERE id = ${questionId}`;
        
        if (result.length === 0) {
            return { success: false, error: 'Question not found' };
        }

        return { 
            success: true, 
            question: result[0]
        };
    } catch (error) {
        console.error('Error fetching question:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export async function fetchRandomQuestionByTopic(topicId?: number) {
    const query = topicId 
        ? sql`
            SELECT q.* FROM questions q
            JOIN question_answer_options qao ON q.id = qao.question_id
            WHERE q.topic_id = ${topicId}
            GROUP BY q.id
            HAVING COUNT(qao.id) > 0
            ORDER BY RANDOM() 
            LIMIT 1`
        : sql`
            SELECT q.* FROM questions q
            JOIN question_answer_options qao ON q.id = qao.question_id
            GROUP BY q.id
            HAVING COUNT(qao.id) > 0
            ORDER BY RANDOM() 
            LIMIT 1`;
    
    const result = await query;
    return result[0];
}

export const countQuestionsByTopic = async (topicId: number) => {
    const result = await sql`
        SELECT COUNT(*) as count 
        FROM questions 
        WHERE topic_id = ${topicId}
    `;
    return Number(result[0].count);
};
