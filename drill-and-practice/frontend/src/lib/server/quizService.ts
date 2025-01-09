import sql from '$lib/server/database';

export async function updateQuizResult(userId: number, topicId: number, userScore: number, topicMaxScore: number) {
    try {
        await sql`
            INSERT INTO quiz_results (user_id, topic_id, user_score, topic_max_score)
            VALUES (${userId}, ${topicId}, ${userScore}, ${topicMaxScore})
            ON CONFLICT (user_id, topic_id)
            DO UPDATE SET 
                user_score = ${userScore},
                topic_max_score = ${topicMaxScore},
                created_at = CURRENT_TIMESTAMP
        `;
        return { success: true };
    } catch (error) {
        console.error('Error updating quiz result:', error);
        return { success: false, error: 'Database error occurred' };
    }
}

export async function getQuizResult(userId: number, topicId: number) {
    try {
        const result = await sql`
            SELECT user_score, topic_max_score 
            FROM quiz_results 
            WHERE user_id = ${userId} 
            AND topic_id = ${topicId}`;
        
        return {
            success: true,
            score: result[0]?.user_score || 0,
            totalQuestions: result[0]?.topic_max_score || 0
        };
    } catch (error) {
        console.error('Error fetching quiz result:', error);
        return { 
            success: false, 
            error: 'Database error occurred',
            score: 0,
            totalQuestions: 0
        };
    }
} 