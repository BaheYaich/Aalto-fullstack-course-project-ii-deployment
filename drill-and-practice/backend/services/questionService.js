import { sql } from "../database/database.js";

const addQuestion = async (question, topicId, userId) => {
    try {
        await sql`INSERT INTO questions (question_text, topic_id, user_id)
            VALUES (${question}, ${topicId}, ${userId})`;
    } catch (e) {
        console.log("Error adding question: ", e);
        throw e;
    }
};

const deleteQuestion = async (questionId) => {
    try {
        await sql`DELETE FROM questions WHERE id = ${questionId};`;
    } catch (e) {
        console.log("Error deleting question: ", e);
        throw e;
    }
};

const getQuestion = async (topicId, questionId) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} AND id = ${questionId}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error fetching question: ", e);
        throw e;
    }
};

const getQuestionByQuestion_text = async (topicId, question_text) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} AND question_text = ${question_text}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error fetching question by text: ", e);
        throw e;
    }
};

const getAllQuestions = async (topicId) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error fetching all questions: ", e);
        throw e;
    }
};

const getYourQuestions = async (topicId, userId) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} AND user_id = ${userId}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error fetching your questions: ", e);
        throw e;
    }
};

const getRandomQuestion = async () => {
    try {
        const result = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error fetching random question: ", e);
        throw e;
    }
};

export { addQuestion, deleteQuestion, getQuestion, getQuestionByQuestion_text, getAllQuestions, getYourQuestions, getRandomQuestion };