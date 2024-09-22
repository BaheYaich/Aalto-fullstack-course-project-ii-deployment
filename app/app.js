import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as addressService from "./services/addressService.js";

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

const addAddress = async (request) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const address = formData.get("address");

  await addressService.create(name, address);

  return redirectTo("/");
};

const countAddresses = async (request) => {
  const data = {
    addresses: await addressService.countAddresses(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  if (request.method === "POST") {
    return await addAddress(request);
  } else {
    return await countAddresses();
  }
};

serve(handleRequest, { port: 7777 });
