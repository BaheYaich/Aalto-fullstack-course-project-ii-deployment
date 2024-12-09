import { sql } from "../database/database.js";

const addOptions = async (options, isCorrects, questionId) => {
    try {
        for (let i = 0; i < options.length; i++) {
            await insertOption(options[i], questionId, isCorrects[i]);
        }
    } catch (e) {
        console.log("Error in addOptions: ", e);
        throw new Error("Error in addOptions: " + e.message);
    }
};

const insertOption = async (option, questionId, isCorrect) => {
    try {
        await sql`INSERT INTO question_answer_options (option_text, question_id, is_correct) VALUES (${option}, ${questionId}, ${isCorrect})`;
    } catch (e) {
        console.log("Error in insertOption: ", e);
        throw new Error("Error in insertOption: " + e.message);
    }
};

const getOptions = async (questionId) => {
    try {
        const result = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in getOptions: ", e);
        throw new Error("Error in getOptions: " + e.message);
    }
};

const deleteOptions = async (optionId) => {
    try {
        await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
    } catch (e) {
        console.log("Error in deleteOptions: ", e);
        throw new Error("Error in deleteOptions: " + e.message);
    }
};

const checkOption = async (optionId) => {
    try {
        const result = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in checkOption: ", e);
        throw new Error("Error in checkOption: " + e.message);
    }
};

const checkAnswer = async (optionId, questionId) => {
    try {
        const result = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${optionId} AND question_id = ${questionId}`;
        return result.length ? result[0].is_correct : null;
    } catch (e) {
        console.log("Error in checkAnswer: ", e);
        throw new Error("Error in checkAnswer: " + e.message);
    }
};

const getCorrectOption = async (questionId) => {
    try {
        const result = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in getCorrectOption: ", e);
        throw new Error("Error in getCorrectOption: " + e.message);
    }
};

export { addOptions, insertOption, getOptions, deleteOptions, checkOption, checkAnswer, getCorrectOption };