import { redirect, fail } from '@sveltejs/kit';
import { fetchTopics, addTopic, deleteTopic } from '$lib/server/topicService';
import { topicSchema } from '$lib/validation/topicSchema';
import type { User } from '$lib/types';

interface Locals {
    user?: User | null;
}

export async function load({ locals }: { locals: Locals }) {
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
    addTopic: async ({ request, locals }: { request: Request, locals: Locals }) => {
        if (!locals.user?.admin) {
            return fail(403, { 
                errors: { form: 'Unauthorized' }
            });
        }

        const formData = Object.fromEntries(await request.formData());
        const result = topicSchema.safeParse(formData);
            
        if (!result.success) {
            return fail(400, { 
                errors: { form: result.error.errors[0].message }
            });
        }

        const { name } = result.data;
        const { success, error } = await addTopic(name, locals.user.id);
        
        if (!success) {
            return fail(400, {
                errors: { form: error || 'Failed to add topic' }
            });
        }

        throw redirect(303, '/topics');
    },

    deleteTopic: async ({ request, locals }: { request: Request, locals: Locals }) => {
        if (!locals.user?.admin) {
            return fail(403, { 
                errors: { form: 'Unauthorized' }
            });
        }
    
        const formData = await request.formData();
        const topicId = Number(formData.get('id'));
    
        const success = await deleteTopic(topicId);
    
        if (!success) {
            return fail(500, {
                errors: { form: 'Failed to delete topic' }
            });
        }
    
        throw redirect(303, '/topics');
    }
};