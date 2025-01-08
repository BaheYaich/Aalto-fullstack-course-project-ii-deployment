import sql from './database';

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

export async function submitAnswer(
    questionId: number, 
    optionId: number, 
    userId: number
) {
    try {
        // Check if user has already answered this question
        const existingAnswer = await sql`
            SELECT * FROM question_answers 
            WHERE question_id = ${questionId} 
            AND user_id = ${userId}`;

        if (existingAnswer.length > 0) {
            return { 
                success: false, 
                error: 'You have already answered this question' 
            };
        }

        // Check if the selected option is correct
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

        // Insert the answer
        await sql`
            INSERT INTO question_answers (
                question_id, 
                question_answer_option_id, 
                user_id
            ) VALUES (
                ${questionId}, 
                ${optionId}, 
                ${userId}
            )`;

        return { 
            success: true,
            isCorrect: selectedOption[0].is_correct
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
        // Check if option already exists in this question (case insensitive)
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