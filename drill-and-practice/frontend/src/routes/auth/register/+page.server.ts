import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registrationSchema } from '$lib/validation/authSchema';
import { addUser } from '$lib/server/userService';
import { hashPassword } from '$lib/helpers/auth';
import { z } from 'zod';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        
        try {
            const result = registrationSchema.safeParse(formData);
            
            if (!result.success) {
                const errors = result.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {} as Record<string, string>);
                
                return fail(400, { 
                    success: false,
                    errors,
                    data: formData
                });
            }

            const { email, password } = result.data;
            const hashedPassword = await hashPassword(password);
            await addUser(email, hashedPassword);
            
            return {
                type: 'success',
                data: {
                    message: 'Registration successful',
                    redirect: '/auth/login'
                }
            };
        } catch (error) {
            return fail(400, { 
                success: false,
                errors: {
                    form: 'Something went wrong. Please try again.'
                }
            });
        }
    }
};
