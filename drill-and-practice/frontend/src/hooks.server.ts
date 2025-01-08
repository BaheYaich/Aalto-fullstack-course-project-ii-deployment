import { findUserBySessionToken } from '$lib/server/userService';
import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types';

declare module '@sveltejs/kit' {
    interface Locals {
        user?: User | null;
    }
}

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    if (token) {
        const user = await findUserBySessionToken(token);
        (event.locals as { user?: User | null }).user = user ? {
            id: user.id,
            email: user.email,
            admin: user.admin || false
        } : null;
    } else {
        (event.locals as { user?: User | null }).user = null;
    }

    return resolve(event);
};