import { json } from '@sveltejs/kit';
import { fetchRandomQuestionByTopic } from '$lib/server/questionService';
import { fetchQuestionOptions } from '$lib/server/optionService';
import { corsHeaders } from '$lib/server/corsHeaders';

export async function GET() {
    console.log('Random question API endpoint hit');
    
    try {
        // Get random question
        const question = await fetchRandomQuestionByTopic();
        console.log('Random question:', question);
        
        if (!question) {
            console.log('No questions found');
            return new Response(JSON.stringify({}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }

        // Get options for the question
        const options = await fetchQuestionOptions(question.id);
        console.log('Question options:', options);

        const response = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: options.map(opt => ({
                optionId: opt.id,
                optionText: opt.option_text,
                isCorrect: opt.is_correct
            }))
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    }
} 