import * as userService from "../services/userService.js";

const userMiddleware = async (context, next) => {
    const sessionUser = await context.state.session.get("user");

    if (sessionUser) {
        const userFromDatabase = await userService.findUserByEmail(sessionUser.email);

        if (userFromDatabase.length === 1) {
            context.user = userFromDatabase[0];
        } 
    }

    await next();
};

export { userMiddleware };