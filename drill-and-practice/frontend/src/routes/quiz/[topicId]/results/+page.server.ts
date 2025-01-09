import { redirect } from '@sveltejs/kit';
import { getQuizResult } from '$lib/server/quizService';

export async function load({ params, parent }) {
    const { user } = await parent();
    
    if (!user) {
        throw redirect(303, '/auth/login');
    }

    const topicId = Number(params.topicId);
    const result = await getQuizResult(user.id, topicId);
    
    return {
        topicId,
        score: result.score,
        totalQuestions: result.totalQuestions
    };
}