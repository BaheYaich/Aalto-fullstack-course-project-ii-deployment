import getDatabaseConnection from '$lib/server/database';

const sql = getDatabaseConnection();

export const fetchQuestionOptions = async (question_id: number) => {
    console.log('DEBUGGING: fetchQuestionOptions called with question_id:', question_id);
    try {
        const options = await sql`
            SELECT * FROM question_answer_options 
            WHERE question_id = ${question_id}
        `;
        
        console.log('DEBUGGING: SQL Query Results:', {
            question_id,
            options_count: options.length,
            options: options
        });

        return options;
    } catch (error) {
        console.error('DEBUGGING: Error in fetchQuestionOptions:', error);
        throw error;
    }
};

export async function submitAnswer(questionId: number, optionId: number, userId: number) {
    try {
        // Check if user has already answered this question
        const existingAnswer = await sql`
            SELECT qao.is_correct 
            FROM question_answers qa
            JOIN question_answer_options qao ON qa.question_answer_option_id = qao.id
            WHERE qa.user_id = ${userId}
            AND qao.question_id = ${questionId}`;

        if (existingAnswer.length > 0) {
            return {
                success: false,
                error: 'You have already answered this question',
                isCorrect: existingAnswer[0].is_correct
            };
        }

        // Insert the answer
        await sql`
            INSERT INTO question_answers 
            (user_id, question_answer_option_id) 
            VALUES (${userId}, ${optionId})`;

        // Check if answer was correct
        const result = await checkAnswer(questionId, optionId);
        return {
            success: true,
            isCorrect: result.success ? result.isCorrect : false
        };
    } catch (error) {
        console.error('Error submitting answer:', error);
        return {
            success: false,
            error: 'Database error occurred'
        };
    }
}

export const addQuestionOption = async (
    option_text: string, 
    question_id: number,
    is_correct: boolean = false
) => {
    try {
        // Check if option already exists in this question
        const existingOption = await sql`
            SELECT * FROM question_answer_options 
            WHERE LOWER(option_text) = LOWER(${option_text})
            AND question_id = ${question_id}`;

        if (existingOption.length > 0) {
            return { success: false, error: 'This option already exists for this question' };
        }

        await sql`
            INSERT INTO question_answer_options (option_text, question_id, is_correct) 
            VALUES (${option_text}, ${question_id}, ${is_correct})`;
        return { success: true };
    } catch (error) {
        console.error('Error adding question option:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export const deleteQuestionOption = async (id: number) => {
    try {
        await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
        return true;
    } catch (error) {
        console.error('Error deleting question option:', error);
        return false;
    }
};

export const updateCorrectAnswer = async (questionId: number, optionId: number) => {
    try {
        await sql`
            UPDATE question_answer_options 
            SET is_correct = false 
            WHERE question_id = ${questionId}`;

        await sql`
            UPDATE question_answer_options 
            SET is_correct = true 
            WHERE id = ${optionId}`;

        return { success: true };
    } catch (error) {
        console.error('Error updating correct answer:', error);
        return { success: false, error: 'Database error occurred' };
    }
};

export async function checkAnswer(questionId: number, optionId: number) {
    try {
        // First check if question exists
        const question = await sql`
            SELECT id FROM questions WHERE id = ${questionId}`;

        if (question.length === 0) {
            return { 
                success: false, 
                error: 'Question ID is non-existent or invalid' 
            };
        }

        const selectedOption = await sql`
            SELECT is_correct 
            FROM question_answer_options 
            WHERE id = ${optionId} 
            AND question_id = ${questionId}`;

        if (selectedOption.length === 0) {
            return { 
                success: false, 
                error: 'Invalid option selected' 
            };
        }

        return { 
            success: true,
            isCorrect: selectedOption[0].is_correct
        };
    } catch (error) {
        console.error('Error checking answer:', error);
        return { 
            success: false, 
            error: 'Database error occurred' 
        };
    }
} 