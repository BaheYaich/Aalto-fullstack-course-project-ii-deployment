import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as userController from "./controllers/userController.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/api/user", userController.getUserData);

router.get("/topics", topicController.listTopics)
router.post("/topics", topicController.addTopic);
router.delete("/topics/:id/delete", topicController.deleteTopic);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.post("/logout", loginController.processLogout);

export { router };