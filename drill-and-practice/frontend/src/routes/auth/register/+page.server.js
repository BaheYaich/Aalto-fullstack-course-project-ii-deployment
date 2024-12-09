import { redirect } from '@sveltejs/kit';
import { addUser } from '$lib/server/userService';
import bcrypt from 'bcryptjs';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Add the user to the database with the hashed password
      const newUser = await addUser(email, hashedPassword);

      if (newUser) {
        // Registration was successful, redirect to the login page
        return redirect(303, '/auth/login');
      }

      // If registration failed for some reason, send an error message back
      return {
        errors: { message: 'Registration failed. Please try again.' },
      };
    } catch (error) {
      // In case of errors (e.g., email already exists or database issues)
      return {
        errors: { message: error.message || 'Registration failed. Try again.' },
      };
    }
  },
};