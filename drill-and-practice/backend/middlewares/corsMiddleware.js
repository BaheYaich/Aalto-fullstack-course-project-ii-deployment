const corsMiddleware = async (context, next) => {
    context.response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
    context.response.headers.set("Access-Control-Allow-Credentials", "true");
    context.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    context.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (context.request.method === "OPTIONS") {
        context.response.status = 204; // No Content
        return;
    }
    await next();
};

export { corsMiddleware }