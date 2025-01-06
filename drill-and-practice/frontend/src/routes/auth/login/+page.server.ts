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
        const email = formData.get('email');
        const password = formData.get('password');

        const user = await findUserByEmail(email as string);

        if (!user || !user.password) {
            console.log('Server: Invalid credentials error', { 
                errors: { message: 'Invalid email or password' }
            });
            return {
                errors: { message: 'Invalid email or password' }
            };
        }

        const passwordMatch = await bcrypt.compare(password as string, user.password);

        if (!passwordMatch) {
            console.log('Server: Password mismatch error', { 
                errors: { message: 'Invalid email or password' }
            });
            return {
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