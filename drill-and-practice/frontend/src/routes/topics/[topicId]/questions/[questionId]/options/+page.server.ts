import { fail, redirect } from '@sveltejs/kit';
import { fetchQuestionOptions, addQuestionOption, deleteQuestionOption } from '$lib/server/optionService';
import { questionOptionSchema } from '$lib/validation/questionOptionSchema';

export async function load({ params, parent }) {
    const { user } = await parent();
    
    if (!user) {
        throw redirect(303, '/auth/login');
    }

    const topicId = Number(params.topicId);
    const questionId = Number(params.questionId);

    try {
        const options = await fetchQuestionOptions(questionId);
        
        return {
            options,
            topicId,
            questionId,
            user
        };
    } catch (error) {
        console.error('Error fetching question options:', error);
        return {
            options: [],
            topicId,
            questionId,
            user
        };
    }
}

export const actions = {
    addOption: async ({ request, params, locals }) => {
        const user = locals.user;

        if (!user) {
            return fail(403, { 
                errors: { form: 'Unauthorized' }
            });
        }

        const formData = Object.fromEntries(await request.formData());
        const result = questionOptionSchema.safeParse({
            ...formData,
            is_correct: formData.is_correct === 'on'
        });
            
        if (!result.success) {
            return fail(400, { 
                data: { 
                    option_text: formData.option_text as string,
                    is_correct: formData.is_correct === 'on'
                },
                errors: { form: result.error.errors[0].message }
            });
        }

        const { option_text, is_correct } = result.data;
        const { success, error } = await addQuestionOption(
            option_text, 
            Number(params.questionId), 
            is_correct
        );
        
        if (!success) {
            return fail(400, {
                data: { option_text, is_correct },
                errors: { form: error || 'Failed to add option' }
            });
        }

        throw redirect(303, `/topics/${params.topicId}/questions/${params.questionId}/options`);
    },

    deleteOption: async ({ request, params, locals }) => {
        const user = locals.user;

        if (!user) {
            return fail(403, { 
                success: false,
                errors: { form: 'Unauthorized' }
            });
        }

        const formData = await request.formData();
        const optionId = Number(formData.get('id'));

        const success = await deleteQuestionOption(optionId);

        if (success) {
            throw redirect(303, `/topics/${params.topicId}/questions/${params.questionId}/options`);
        }

        return fail(403, {
            success: false,
            errors: { form: 'Failed to delete option' }
        });
    }
}; 