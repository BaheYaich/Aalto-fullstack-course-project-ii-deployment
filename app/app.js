import { Application, Router } from "./deps.js";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";

const app = new Application();
const router = new Router();
app.use(Session.initMiddleware());

const authenticate = async ({ request, response, state }) => {
  const authenticated = await state.session.get("authenticated");

  if (!authenticated) {
    const body = request.body();
    const params = await body.value;
    const username = params.get("username");
    const password = params.get("password");
    if ((password === "00000000") && (username === "Minuteman")) {
      await state.session.set("authenticated", true);
      response.body = "Authenticated";
      response.redirect("/");
    } else {
      response.status = 401;
      response.body = "Bad credentials";
    }
  };
}

const showStatus = async ({ response, state }) => {
  const authenticated = await state.session.get("authenticated")
  if (!authenticated) {
    response.body = "Not authenticated";
  } else {
    response.body = "Authenticated";
  }
};

router.get("/", showStatus);
router.post("/", authenticate);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;