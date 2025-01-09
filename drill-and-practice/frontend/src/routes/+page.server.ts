import sql from '$lib/server/database';

export async function load() {
    const stats = await sql`
        SELECT 
            (SELECT COUNT(*) FROM topics) as topic_count,
            (SELECT COUNT(*) FROM questions) as question_count,
            (SELECT COUNT(*) FROM question_answers) as answer_count
    `;
    
    return {
        stats: {
            topicCount: stats[0].topic_count,
            questionCount: stats[0].question_count,
            answerCount: stats[0].answer_count
        }
    };
}
