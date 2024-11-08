import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(Session.initMiddleware());
app.use(renderMiddleware);

const authMiddleware = async ({ request, response, state }, next) => {
  if (request.url.pathname !== '/login' && !(await state.session.get('authenticated'))) {
    response.redirect('/login')
  } else {
    await next()
  }
}

const hello = ({ response }) => {
  response.body = 'Only authenticated users can access this';
}

const showForm = async ({ render }) => {
  await render('index.eta')
}

const authenticate = async ({ request, response, state }) => {
  const body = request.body({ type: "form" })
  const params = await body.value

  const password = params.get('password')
  if (password === 'asparagus') {
    await state.session.set('authenticated', true)
    response.redirect('/')
  } else {
    response.status = 401
    response.body = 'Unauthorized: Invalid Password'
  }
}

router.get('/', hello)
router.get('/login', showForm)
router.post('/login', authenticate)

app.use(authMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 7777 })