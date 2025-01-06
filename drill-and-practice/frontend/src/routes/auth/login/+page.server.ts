import { redirect } from '@sveltejs/kit';
import { setSessionTokenForUser, generateSessionToken, findUserByEmail } from '$lib/server/userService';
import bcrypt from 'bcryptjs';
import type { User } from '$lib/types';

interface Locals {
    user?: User | null;
}

export const actions = {
    default: async ({ request, cookies, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const user = await findUserByEmail(email);

        if (!user || !user.password) {
            return {
                data: { email, password },
                errors: { message: 'Invalid email or password' }
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {
                data: { email, password },
                errors: { message: 'Invalid email or password' }
            };
        }

        const sessionToken = generateSessionToken();

        await setSessionTokenForUser(user.id, sessionToken);
        cookies.set('token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60,
        });

        return redirect(303, '/topics');
    }
};