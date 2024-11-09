import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(errorMiddleware);

app.use(Session.initMiddleware());

app.use(async ({ request, response, state }, next) => {
  if (request.url.pathname.startsWith("/accounts")) {
    if (await state.session.get("authenticated")) {
      await next()
    } else {
      response.status = 401
    }
  } else {
    await next()
  }
})

app.use(renderMiddleware);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
