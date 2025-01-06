import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registrationSchema } from '$lib/validation/authSchema';
import { addUser } from '$lib/server/userService';
import { hashPassword } from '$lib/helpers/auth';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        
        try {
            const result = registrationSchema.safeParse(formData);
            
            if (!result.success) {
                return fail(400, { 
                    errors: { 
                        message: result.error.errors[0].message 
                    }
                });
            }

            const { email, password } = result.data;
            const hashedPassword = await hashPassword(password);
            await addUser(email, hashedPassword);
            
            return redirect(303, '/auth/login');
        } catch (error) {
            return fail(400, { 
                errors: { 
                    message: 'Something went wrong. Please try again.'
                }
            });
        }
    }
};
