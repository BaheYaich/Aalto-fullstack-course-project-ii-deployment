import sql from "../database/database.js";

const createTopic = async (userID, topicName) => {
    try {
        await sql`INSERT INTO topics (user_id, name) VALUES (${userID}, ${topicName})`;
    } catch (e) {
        console.log("Error in createTopic: ", e);
        throw new Error("Error in createTopic: " + e.message);
    }
};

const getTopics = async () => {
    try {
        const result = await sql`SELECT * FROM topics ORDER BY name ASC`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in getTopics: ", e);
        throw new Error("Error in getTopics: " + e.message);
    }
};

const getTopic = async (id) => {
    try {
        const result = await sql`SELECT * FROM topics WHERE id = ${id}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in getTopic: ", e);
        throw new Error("Error in getTopic: " + e.message);
    }
};

const getTopicByName = async (name) => {
    try {
        const result = await sql`SELECT * FROM topics WHERE name = ${name}`;
        return result.length ? result : [];
    } catch (e) {
        console.log("Error in getTopicByName: ", e);
        throw new Error("Error in getTopicByName: " + e.message);
    }
};

const deleteTopicById = async (id) => {
    try {
        await sql`DELETE FROM topics WHERE id = ${id}`;
    } catch (e) {
        console.log("Error in deleteTopic: ", e);
        throw new Error("Error in deleteTopic: " + e.message);
    }
};

export { createTopic, deleteTopicById, getTopic, getTopics, getTopicByName };