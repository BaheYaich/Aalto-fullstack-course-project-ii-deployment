import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as formController from "./controllers/formController.js";
import * as fileController from "./controllers/fileController.js"

const router = new Router();

router.get("/", formController.viewForm);
router.post("/", fileController.storeFile);
router.post("/files", fileController.retrieveFile);

export { router };
