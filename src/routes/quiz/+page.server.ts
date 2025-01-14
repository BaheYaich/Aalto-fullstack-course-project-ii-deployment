import { redirect } from '@sveltejs/kit';
import { fetchTopics } from '$lib/server/topicService';

export async function load({ parent }) {
    const { user } = await parent();
    
    if (!user) {
        throw redirect(303, '/auth/login');
    }

    const topics = await fetchTopics();
    
    // Sort topics alphabetically
    topics.sort((a, b) => a.name.localeCompare(b.name));

    return {
        topics,
        user
    };
} 