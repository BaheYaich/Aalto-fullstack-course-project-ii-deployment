import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const listTopics = async ({ render }) => {
    try {
        const topics = await topicService.getTopics();
        render("topics.eta", { topics });
    } catch (e) {
        console.log("Error in listTopics: ", e);
        render("error.eta", { error: e.message });
    }
};

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};

const addTopic = async ({ request, response, render, state }) => {
    const user = await state.session.get("user");
    if (!user || !user.admin) {
        response.status = 403;
        response.body = "You don't have permission to add a topic.";
        return;
    }

    const topicData = await getTopicData(request);
    const [passes, errors] = await validasaur.validate(
        topicData,
        topicValidationRules,
    );

    if (!passes) {
        console.log(errors);

        const topics = await topicService.getTopics();
        render("topics.eta", {
            topics,
            validationErrors: errors,
            csrfToken: state.csrfToken,
        });
    } else {
        await topicService.createTopic(user.id, topicData.name);
        response.redirect("/topics");
    }
};

const deleteTopic = async ({ params, request, state, response }) => {
    console.log("deleteTopic route triggered"); // Add this log to check

    const user = await state.session.get("user");
  
    if (!user || !user.admin) {
      response.status = 403;
      response.body = "Forbidden: You don't have permission to delete.";
      return;
    }
  
    // Check if it's a DELETE or POST with method override
    const method = (await request.body()).value._method || request.method;
    if (method !== "DELETE") {
      response.status = 405;
      response.body = "Invalid request method.";
      return;
    }
  
    const topicId = params.id;
    try {
      await topicService.deleteTopicById(topicId);
      response.redirect("/topics");
    } catch (error) {
      response.status = 500;
      response.body = "Error deleting topic.";
    }
};

export { addTopic, listTopics, deleteTopic };