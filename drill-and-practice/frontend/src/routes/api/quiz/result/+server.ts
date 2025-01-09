import { json } from '@sveltejs/kit';
import { updateQuizResult } from '$lib/server/quizService';

export async function POST({ request, locals }) {
    if (!locals.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const { topicId, userScore, topicMaxScore } = await request.json();
        
        // Validate that userScore cannot exceed topicMaxScore
        const validatedScore = Math.min(userScore, topicMaxScore);
        
        const result = await updateQuizResult(
            locals.user.id, 
            topicId, 
            validatedScore, 
            topicMaxScore
        );
        
        if (!result.success) {
            throw new Error(result.error);
        }

        return json({ success: true });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 