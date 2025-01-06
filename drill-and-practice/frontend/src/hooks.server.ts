import { findUserBySessionToken } from '$lib/server/userService';
import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

interface Locals {
    user?: User | null;
}

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    if (token) {
        const user = await findUserBySessionToken(token) as User | null;
        (event.locals as Locals).user = user;
    } else {
        (event.locals as Locals).user = null;
    }

    return resolve(event);
};