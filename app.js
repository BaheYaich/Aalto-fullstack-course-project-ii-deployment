import { serve } from "./deps.js";

const handleRequest = (request) => {
    let message = "Seeking truths beyond meaning of life, you will find 43.";
  return new Response(message);
};

serve(handleRequest, { port: 7777 });