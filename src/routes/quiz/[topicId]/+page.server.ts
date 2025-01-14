import { redirect } from '@sveltejs/kit';
import { fetchTopicById } from '$lib/server/topicService';
import { fetchRandomQuestionByTopic, countQuestionsByTopic } from '$lib/server/questionService';

export async function load({ params, parent }) {
    const { user } = await parent();
    
    if (!user) {
        throw redirect(303, '/auth/login');
    }

    const topicId = Number(params.topicId);
    const [topic, totalQuestions] = await Promise.all([
        fetchTopicById(topicId),
        countQuestionsByTopic(topicId)
    ]);
    
    if (!topic) {
        throw redirect(303, '/quiz');
    }

    if (totalQuestions === 0) {
        return {
            topic,
            noQuestions: true
        };
    }

    const randomQuestion = await fetchRandomQuestionByTopic(topicId);

    return {
        topic,
        randomQuestion,
        totalQuestions,
        noQuestions: false
    };
} 