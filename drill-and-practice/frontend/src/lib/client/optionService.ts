export async function fetchQuestionOptions(question_id: number) {
    const response = await fetch(`/api/options?questionId=${question_id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch options');
    }
    
    return response.json();
} 