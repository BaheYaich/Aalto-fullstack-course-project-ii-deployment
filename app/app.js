import { Application, Router } from "./deps.js";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";

const app = new Application();
const router = new Router();
app.use(Session.initMiddleware());

const showStatus = ({ response }) => {
  response.body = "Not authenticated";
};

const authenticate = ({ response }) => {
  response.redirect("/");
};

router.get("/", showStatus);
router.post("/", authenticate);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;