import * as requestUtils from "../utils/requestUtils.js";
import * as individualListService from "../services/individualListService.js";

const createItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    await individualListService.createItem(urlParts[2], name);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const toggleCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const item = await individualListService.fetchItem(urlParts[4]);
    if (!item.collected) {
        await individualListService.markAsCollected(urlParts[4]);
    } else {
        await individualListService.markAsNotCollected(urlParts[4]);
    }
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createItem, toggleCollected };
