import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();
const router = new Router();

const echo = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  response.body = document;
};

const echoName = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  response.body = { name: document.name };
};

router.post("/", echo);
router.post("/name", echoName);

app.use(router.routes());

export { app };
