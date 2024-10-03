import { renderFile } from "../deps.js";
import * as listsService from "../services/listsService.js";
import * as individualListService from "../services/individualListService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewLists = async (request) => {
    const url = new URL(request.url);
    const data = {
        lists: await listsService.findAllActiveLists(),
        path: url.pathname,
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listsService.create(name);
    return requestUtils.redirectTo("/lists");
};

const deleteList = async (request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[2];
    await listsService.deactivateById(id);
    return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        list: await listsService.findById(urlParts[2]),
        existingItems: await individualListService.fetchExistingItems(
            urlParts[2],
        ),
        path: url.pathname,
    };
    return new Response(
        await renderFile("individualList.eta", data),
        responseDetails,
    );
};

export { addList, deleteList, viewList, viewLists };
