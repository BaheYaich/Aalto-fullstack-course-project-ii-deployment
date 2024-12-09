async function getUserData(context) {
    if (!context.state.user) {
      context.response.status = 401; // Unauthorized if no user data in context
      context.response.body = { message: "User not authenticated" };
      return;
    }
    
    const user = context.state.user; // This is the user data (from your authMiddleware)
    context.response.body = user; // Return user as JSON
  }