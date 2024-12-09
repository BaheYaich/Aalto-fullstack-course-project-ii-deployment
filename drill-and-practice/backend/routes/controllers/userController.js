const getUserData = async (context, next) => {
    const user = context.user;

    if (!user) {
        context.response.status = 401;
        context.response.body = { message: "User not authenticated" };
        return;
    }

    context.response.body = user;
};

  export { getUserData };