import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import * as songService from "./services/songService.js"

const app = new Application();
const router = new Router();

app.use(renderMiddleware)

const getAllSongs = async ({ response }) => {
  const songs = await songService.getAllSongs()
  response.type = "application/json";
  response.body = songs
}


const getSong = async ({ params, response }) => {
  const { id } = params
  const song = await songService.getSong(id)

  if (song) {
    response.type = "application/json";
    response.body = song
  } else {
    response.status = 404
    response.body = { error: "Song not found" }
  }
}

const deleteSong = async ({ params, response }) => {
  const { id } = params;
  const success = await songService.deleteSong(id);

  if (success) {
    response.status = 204
    response.body = { status: "success" }
  } else {
    response.status = 404
    response.body = { error: "Song not found or could not be deleted" };
  }
}

const addSong = async ({ request, response }) => {
  try {
    const body = await request.body({ type: "json" });
    console.log("Raw body type:", body.type);
    console.log("Raw body:", body);

    const { name, rating } = await body.value;
    console.log("Parsed values:", { name, rating });

    if (!name || !rating) {
      throw new Error("Invalid name or rating");
    }

    const success = await songService.addSong(name, rating);

    if (success) {
      response.status = 200;
      response.body = { status: "success" };
    } else {
      response.status = 500;
      response.body = { error: "Song could not be added" };
    }
  } catch (error) {
    console.error("Error in addSong handler:", error);
    response.status = 400;
    response.body = { error: error.message };
  }
};

router.get("/songs", getAllSongs);
router.get("/songs/:id", getSong).delete("/songs/:id", deleteSong)
router.post("/songs", addSong)

app.use(router.routes())

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
