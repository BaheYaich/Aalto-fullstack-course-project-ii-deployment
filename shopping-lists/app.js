import { serve } from "./deps.js";
import { serveFile } from "./deps.js";
import { configure } from "./deps.js";
import * as homepageController from "./controllers/homePageController.js";
import * as listsController from "./controllers/listsController.js";
import * as individualListController from "./controllers/individualListController.js";

const port = 7777;

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/assets")) {
    const filePath = `.${url.pathname}`;
    return await serveFile(request, filePath);
  } else if (url.pathname === "/" && request.method === "GET") {
    return await homepageController.initiateHomepage(request);
  } else if (request.method === "POST" && url.pathname.includes("deactivate")) {
    return await listsController.deleteList(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listsController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listsController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listsController.viewList(request);
  } else if (
    url.pathname.match("lists/[0-9]+/items/[0-9]+") &&
    request.method === "POST"
  ) {
    return await individualListController.toggleCollected(request);
  } else if (
    url.pathname.match("lists/[0-9]+/items") && request.method === "POST"
  ) {
    return await individualListController.createItem(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
    return await listsController.deleteList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port });
