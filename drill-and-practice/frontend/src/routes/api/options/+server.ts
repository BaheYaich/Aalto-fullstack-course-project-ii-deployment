import { json } from '@sveltejs/kit';
import { fetchQuestionOptions } from '$lib/server/optionService';

export async function GET({ url }) {
    const questionId = Number(url.searchParams.get('questionId'));

    if (!questionId) {
        return json({ error: 'Invalid question ID' }, { status: 400 });
    }

    try {
        const options = await fetchQuestionOptions(questionId);
        return json(options);
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Failed to fetch options' }, { status: 500 });
    }
} 