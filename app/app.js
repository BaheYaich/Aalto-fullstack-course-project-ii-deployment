import { Application, Router } from "./deps.js";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";

const app = new Application();
app.use(Session.initMiddleware());

const router = new Router();

const showName = async ({ state, response }) => {

  let name = await state.session.get("name")

  if (!name) {
    name = "anonymous"
  }

  await state.session.set("name", name)
  response.body = `Hello ${name}!`
}

const setName = async ({ state, response, request }) => {

  const body = request.body();
  const params = await body.value;
  const name = params.get("name")

  await state.session.set("name", name)
  response.redirect("/");
}

router.get("/", showName).post("/", setName)

app.use(router.routes())

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
