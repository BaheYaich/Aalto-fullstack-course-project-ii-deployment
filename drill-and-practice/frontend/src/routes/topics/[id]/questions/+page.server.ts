import { redirect, fail } from '@sveltejs/kit';
import { fetchQuestionsByTopic, addQuestion, deleteQuestion } from '$lib/server/questionService';
import { fetchTopicById } from '$lib/server/topicService';
import type { User, Question, Topic } from '$lib/types';
import { questionSchema } from '$lib/validation/questionSchema';

interface Locals {
	user?: User | null;
}

export async function load({ locals, params }: { locals: Locals; params: { id: string } }): Promise<{ 
	questions: Question[];
	topic: Topic | null;
	user: User | null;
}> {
	if (!locals.user) {
		console.log('User not found, redirecting to login');
		throw redirect(303, '/auth/login');
	}

	try {
		const [topic, questions] = await Promise.all([
			fetchTopicById(Number(params.id)),
			fetchQuestionsByTopic(Number(params.id))
		]);

		if (!topic) {
			throw redirect(303, '/topics');
		}

		return {
			topic,
			questions: questions.map(row => ({
				id: row.id,
				user_id: row.user_id,
				topic_id: row.topic_id,
				question_text: row.question_text
			})),
			user: locals.user
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return { 
			topic: null,
			questions: [],
			user: locals.user
		};
	}
}

export const actions = {
	addQuestion: async ({ request, locals, params }: { request: Request; locals: Locals; params: { id: string } }) => {
		if (!locals.user) {
			return fail(403, { 
				errors: { form: 'Unauthorized' }
			});
		}

		const formData = Object.fromEntries(await request.formData());
		const result = questionSchema.safeParse(formData);
			
		if (!result.success) {
			return fail(400, { 
				data: { question_text: formData.question_text as string },
				errors: { form: result.error.errors[0].message }
			});
		}

		const { question_text } = result.data;
		const { success, error } = await addQuestion(question_text, locals.user.id, Number(params.id));
		
		if (!success) {
			return fail(400, {
				data: { question_text },
				errors: { form: error || 'Failed to add question' }
			});
		}

		throw redirect(303, `/topics/${params.id}/questions`);
	},

	deleteQuestion: async ({ request, locals, params }: { request: Request; locals: Locals; params: { id: string } }) => {
		if (!locals.user) {
			return fail(403, { 
				success: false,
				errors: { form: 'Unauthorized' }
			});
		}

		const formData = await request.formData();
		const questionId = Number(formData.get('id'));

		const success = await deleteQuestion(questionId, locals.user.id, locals.user.admin);

		if (success) {
			throw redirect(303, `/topics/${params.id}/questions`);
		}

		return fail(403, {
			success: false,
			errors: { form: 'Not authorized to delete this question' }
		});
	}
};
