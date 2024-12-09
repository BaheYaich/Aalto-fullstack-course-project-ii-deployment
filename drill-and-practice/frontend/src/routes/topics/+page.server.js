import { redirect } from '@sveltejs/kit';
import { fetchTopics, addTopic, deleteTopic } from '$lib/server/topicService';


export async function load({ locals }) {
    if (!locals.user) {
      console.log('User not found, redirecting to login');
      throw redirect(303, '/auth/login');
    }
    
    try {
      const topics = await fetchTopics();
      return {
        topics,
      };
    } catch (error) {
      console.error('Error fetching topics:', error);
      return { topics: [] }; // Return an empty array to avoid breaking the page
    }
  }

  export const actions = {
    addTopic: async ({ request, locals }) => {
      if (!locals.user?.admin) {
        return { error: 'Unauthorized' };
      }
  
      const formData = await request.formData();
      const name = formData.get('name');
      const user_id = locals.user.id;
  
      const success = await addTopic(name, user_id);
      if (success) {
        throw redirect(303, '/topics'); // Redirect after successful action
      }
      return { error: 'Failed to add topic' };
    },
  
    deleteTopic: async ({ request, locals }) => {
        if (!locals.user?.admin) {
          return { error: 'Unauthorized' };
        }
    
        const formData = await request.formData();
        const topicId = formData.get('id');
    
        const success = await deleteTopic(topicId);
    
        if (success) {
          throw redirect(303, '/topics'); // Redirect after successful action
        }
    
        return { error: 'Failed to delete topic' };
      },
};