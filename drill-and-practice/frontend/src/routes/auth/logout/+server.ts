import { redirect } from '@sveltejs/kit';
import { clearSessionToken } from '$lib/server/userService';
import type { User } from '$lib/types';

interface Locals {
    user?: User | null;
}

export const POST = async ({ cookies, locals }: { cookies: any, locals: Locals }) => {
  if (locals.user) {
    // Clear session token from the database
    await clearSessionToken(locals.user.id);

    // Remove session token from cookies
    cookies.delete('token', { path: '/' });

    // Redirect to the login page
    return redirect(303, '/auth/login');
  }

  // If no user is logged in, redirect to the login page
  return redirect(303, '/auth/login');
};