import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as measurementService from "./services/measurementService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const averageMeasurement = async () => {
  const data = {
    empty: await measurementService.isEmpty(),
    average: await measurementService.averageMeasurement(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  if (request.method === "GET") {
    return await averageMeasurement();
  }
};

serve(handleRequest, { port: 7777 });
