import { json } from '@sveltejs/kit';
import { checkAnswer } from '$lib/server/optionService';
import { corsHeaders } from '$lib/server/corsHeaders';

export async function OPTIONS() {
    return new Response(null, {
        headers: corsHeaders
    });
}

export async function POST({ request }) {
    try {
        const { questionId, optionId } = await request.json();
        const result = await checkAnswer(questionId, optionId);
        
        if (!result.success) {
            return json({ 
                error: result.error || 'Invalid answer submission'
            }, { 
                status: 400,
                headers: corsHeaders 
            });
        }
        
        return json({ 
            correct: result.isCorrect
        }, { 
            headers: corsHeaders 
        });
    } catch (error) {
        console.error('Error processing answer:', error);
        return json({ 
            error: 'Internal server error'
        }, { 
            status: 500,
            headers: corsHeaders 
        });
    }
} 