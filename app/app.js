import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const getSongs = async () => {
  return await sql`SELECT * FROM songs`;
};

const addSong = async (name, rating) => {
  return await sql`INSERT INTO songs (name, rating) VALUES (${name}, ${rating})`;
};

const showForm = async ({ render }) => {
  render("index.eta", { songs: await getSongs(), name: "", rating: "" });
};


const submitForm = async ({ request, render, response }) => {
  const body = request.body();
  const params = await body.value;

  const name = params.get("name") || "";
  const ratingStr = params.get("rating") || "";
  const rating = ratingStr ? Number(ratingStr) : null;

  const errors = [];

  if ((name.length <= 5) || (name.length >= 20)) {
    errors.push("Song name must be between 5 and 20 characters long");
  }

  if (ratingStr) {
    if ((isNaN(rating)) || (rating <= 1 || rating >= 10)) {
      errors.push("Rating must be a number between 1 and 10");
    }
  }

  if (errors.length > 0) {
    await render("index.eta", {
      errors: errors,
      name: name,
      rating: ratingStr,
    });
    return;
  }

  await addSong(name, rating);
  response.redirect("/");
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
