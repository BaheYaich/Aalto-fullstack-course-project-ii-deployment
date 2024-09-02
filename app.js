import { serve } from "./deps.js";

const handleRequest = (request) => {
    const url = new URL(request.url);
  return new Response(url);
};

serve(handleRequest, { port: 7777 });