import { redirect } from '@sveltejs/kit';
import { setSessionTokenForUser, generateSessionToken, findUserByEmail } from '$lib/server/userService';
import bcrypt from 'bcryptjs';

export const actions = {
  default: async ({ request, cookies }) => {
    console.log("Processing login request...");
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    console.log("Email:", email, "Password provided:", !!password);

    const user = await findUserByEmail(email);
    console.log("User found:", user);

    if (!user || !user.password) {
      console.error("Invalid email or password.");
      return { errors: { message: 'Invalid email or password' } };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return { errors: { message: 'Invalid email or password' } };
    }

    const sessionToken = generateSessionToken();
    console.log("Generated session token:", sessionToken);

    await setSessionTokenForUser(user.id, sessionToken);
    cookies.set('token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });

    console.log("Login successful. Redirecting...");
    return redirect(303, '/');
  },
};