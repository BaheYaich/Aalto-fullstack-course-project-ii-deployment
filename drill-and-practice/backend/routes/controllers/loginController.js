import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";


const processLogin = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", {
    id: user.id,
    email: user.email,
    admin: user.admin,
  });
  response.redirect("/topics");
};

const processLogout = async ({ state, response }) => {
  await state.session.set("user", null);
  response.redirect("/auth/login");
};

const showLoginForm = ({ render, csrfToken }) => {
  render("login.eta", { csrfToken });
};

export { processLogin, processLogout, showLoginForm };