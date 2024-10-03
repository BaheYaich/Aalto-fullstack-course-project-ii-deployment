import { renderFile } from "../deps.js";
import * as homepageService from "../services/homePageStatistics.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const initiateHomepage = async (request) => {
    const url = new URL(request.url);
    const listsStatistics = await homepageService.countAllLists();
    const itemsStatistics = await homepageService.countAllItems();

    const data = {
        title: "Shared shopping lists",
        path: url.pathname,
        listsCount: listsStatistics,
        itemsCount: itemsStatistics,
    };

    return new Response(await renderFile("index.eta", data), responseDetails);
};

export { initiateHomepage };
