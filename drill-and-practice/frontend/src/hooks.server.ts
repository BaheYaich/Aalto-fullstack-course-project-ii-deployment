import { findUserBySessionToken } from '$lib/server/userService';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    const user = await findUserBySessionToken(token);
    event.locals.user = user || null;
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}