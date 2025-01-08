export async function fetchQuestionOptions(question_id: number) {
    const response = await fetch(`/api/options?questionId=${question_id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch options');
    }
    
    return response.json();
}

export async function addQuestionOption(
    option_text: string, 
    topic_id: number,
    question_id: number, 
    is_correct: boolean = false
) {
    const formData = new FormData();
    formData.append('option_text', option_text);
    formData.append('is_correct', is_correct ? 'on' : 'off');

    const response = await fetch(`/topics/${topic_id}/questions/${question_id}/options?/addOption`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.redirected) {
        return { success: true };
    }

    const result = await response.json();
    return result;
}