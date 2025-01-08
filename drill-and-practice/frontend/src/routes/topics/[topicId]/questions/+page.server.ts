import { addQuestion, deleteQuestion, fetchQuestionsByTopic, getQuestionById } from '$lib/server/questionService';
import { fetchTopicById } from '$lib/server/topicService';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { questionSchema } from '$lib/validation/questionSchema';
import type { Actions, PageServerLoad } from './$types';

export async function load({ params, parent }) {
	const { user } = await parent();
	
	if (!user) {
		throw redirect(303, '/auth/login');
	}

	const topicId = Number(params.topicId);
	
	const [topic, questions] = await Promise.all([
		fetchTopicById(topicId),
		fetchQuestionsByTopic(topicId)
	]);

	if (!topic) {
		throw redirect(303, '/topics');
	}

	return {
		topic,
		questions,
		user
	};
}

export const actions = {
	addQuestion: async ({ request, params, locals }) => {
		if (!locals.user) {
			return fail(403, { errors: { form: 'Not authenticated' } });
		}

		const user = locals.user;
		const formData = Object.fromEntries(await request.formData());
		const result = questionSchema.safeParse(formData);
			
		if (!result.success) {
			return fail(400, { 
				data: { question_text: formData.question_text as string },
				errors: { form: result.error.errors[0].message }
			});
		}

		const { question_text } = result.data;
		const { success, error } = await addQuestion(
			question_text, 
			user.id, 
			Number(params.topicId)
		);
		
		if (!success) {
			return fail(400, {
				data: { question_text },
				errors: { form: error || 'Failed to add question' }
			});
		}

		throw redirect(303, `/topics/${params.topicId}/questions`);
	},

	deleteQuestion: async ({ request, params, locals }) => {
		if (!locals.user) {
			return fail(403, { errors: { form: 'Not authenticated' } });
		}

		const formData = await request.formData();
		const questionId = Number(formData.get('id'));

		// Fetch the question to check ownership/permissions
		const question = await getQuestionById(questionId);

		if (!question) {
			return fail(404, { errors: { form: 'Question not found' } });
		}

		// Check if user is admin or question owner
		if (!locals.user.admin && locals.user.id !== question.user_id) {
			return fail(403, { errors: { form: 'Not authorized to delete this question' } });
		}

		const { success, error } = await deleteQuestion(
			questionId, 
			locals.user.id, 
			locals.user.admin
		);

		if (!success) {
			return fail(400, { 
				errors: { form: error || 'Failed to delete question' }
			});
		}

		// Redirect back to the questions page for the current topic
		throw redirect(303, `/topics/${params.topicId}/questions`);
	}
} satisfies Actions;
