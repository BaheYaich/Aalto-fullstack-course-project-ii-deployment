import { json } from '@sveltejs/kit';
import { fetchRandomQuestionByTopic } from '$lib/server/questionService';
import { fetchQuestionOptions } from '$lib/server/optionService';

export async function GET({ params }) {
    try {
        const topicId = Number(params.topicId);
        const question = await fetchRandomQuestionByTopic(topicId);
        
        if (!question) {
            return new Response(null, { status: 404 });
        }

        const options = await fetchQuestionOptions(question.id);
        
        return json({
            id: question.id,
            question_text: question.question_text,
            options
        });
    } catch (error) {
        console.error('Error fetching random question:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 