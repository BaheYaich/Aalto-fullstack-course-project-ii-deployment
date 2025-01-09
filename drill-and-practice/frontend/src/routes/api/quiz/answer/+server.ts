import { json } from '@sveltejs/kit';
import sql from '$lib/server/database';

export async function POST({ request, locals }) {
    if (!locals.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const { questionId, optionId } = await request.json();
        console.log('Debug - Received answer submission:', { questionId, optionId, userId: locals.user.id });

        // First, verify the option belongs to the question
        const optionCheck = await sql`
            SELECT id, question_id 
            FROM question_answer_options 
            WHERE id = ${optionId}`;

        if (optionCheck.length === 0) {
            console.error('Debug - Option not found:', optionId);
            return new Response('Invalid option', { status: 400 });
        }

        // Check if user has already answered this question
        const existingAnswer = await sql`
            SELECT id 
            FROM question_answers 
            WHERE user_id = ${locals.user.id} 
            AND question_id = ${questionId}`;

        if (existingAnswer.length > 0) {
            // Update existing answer
            await sql`
                UPDATE question_answers 
                SET question_answer_option_id = ${optionId}
                WHERE id = ${existingAnswer[0].id}`;
        } else {
            // Insert new answer
            await sql`
                INSERT INTO question_answers 
                (user_id, question_answer_option_id, question_id) 
                VALUES 
                (${locals.user.id}, ${optionId}, ${questionId})`;
        }

        console.log('Debug - Successfully saved/updated answer');
        return json({ success: true });
    } catch (error) {
        console.error('Debug - Error saving answer:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 