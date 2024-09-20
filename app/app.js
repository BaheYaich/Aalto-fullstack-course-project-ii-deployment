import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as songService from "./services/songService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const listSongs = async (request) => {
  const data = {
    songs: await songService.findAll(),
  };
  return new Response(await renderFile("index.eta", data), responseDetails);
};

const deleteSong = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[1];
  console.log(parts);
  await songService.deleteById(id);

  return redirectTo("/songs");
};

const addSong = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const rating = formData.get("rating");
  await songService.create(name, rating);

  return redirectTo("/songs");
};

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/songs") {
    return await listSongs();
  } else if (request.method === "POST" && url.pathname === "/songs") {
    await addSong(request);
  } else if (request.method === "POST" && url.pathname.includes("delete")) {
    await deleteSong(request);
  }

  return redirectTo("/songs");
};

serve(handleRequest, { port: 7777 });
