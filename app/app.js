import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import * as gameService from "./services/gameService.js"

const app = new Application();
const router = new Router();

app.use(renderMiddleware)

const getAllGames = async ({ response }) => {
  const games = await gameService.getAllGames()
  response.type = "application/json";
  response.body = games
}


const getGame = async ({ params, response }) => {
  const { id } = params
  const game = await gameService.getGame(id)

  if (game) {
    response.type = "application/json";
    response.body = game
  } else {
    response.status = 404
    response.body = { error: "Game not found" }
  }
}

const deleteGame = async ({ params, response }) => {
  const { id } = params;
  const success = await gameService.deleteGame(id);

  if (success) {
    response.status = 204
    response.body = { status: "success" }
  } else {
    response.status = 404
    response.body = { error: "Game not found or could not be deleted" };
  }
}

const addGame = async ({ request, response }) => {
  try {
    const body = await request.body({ type: "json" });
    console.log("Raw body type:", body.type);
    console.log("Raw body:", body);

    const { name } = await body.value;
    console.log("Parsed values:", { name });

    if (!name) {
      throw new Error("Invalid name");
    }

    const success = await gameService.addGame(name);

    if (success) {
      response.status = 200;
      response.body = { status: "success" };
    } else {
      response.status = 500;
      response.body = { error: "Game could not be added" };
    }
  } catch (error) {
    console.error("Error in addGame handler:", error);
    response.status = 400;
    response.body = { error: error.message };
  }
};

const getGameRatings = async ({ params, response }) => {
  const { id } = params
  const game = await gameService.getGameRatings(id)

  if (game) {
    response.type = "application/json";
    response.body = game
  } else {
    response.status = 404
    response.body = { error: "Game not found" }
  }
}

const addRatingToGame = async ({ params, request, response }) => {
  try {
    const body = await request.body({ type: "json" });
    const { rating } = await body.value;

    if (!rating) {
      throw new Error("Invalid rating");
    }
    const { id } = params
    const success = await gameService.addRating(rating, id);

    if (success) {
      response.status = 200;
      response.body = { status: "success" };
    } else {
      response.status = 500;
      response.body = { error: "Rating could not be added" };
    }
  } catch (error) {
    console.error("Error in addRatingToGame handler:", error);
    response.status = 400;
    response.body = { error: error.message };
  }
};

router.get("/games", getAllGames);
router.get("/games/:id", getGame).delete("/games/:id", deleteGame)
router.post("/games", addGame)
router.get("/games/:id/ratings", getGameRatings).post("/games/:id/ratings", addRatingToGame)

app.use(router.routes())

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
