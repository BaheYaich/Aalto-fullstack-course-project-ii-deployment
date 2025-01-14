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
                    data: { 
                        email: formData.email as string, 
                        password: formData.password as string 
                    },
                    errors: { 
                        message: result.error.errors[0].message 
                    }
                });
            }

            const { email, password } = result.data;
            
            try {
                const hashedPassword = await hashPassword(password);
                await addUser(email, hashedPassword);
            } catch (dbError) {
                console.error('Database error during user registration:', dbError);
                return fail(400, { 
                    data: { 
                        email: email, 
                        password: password 
                    },
                    errors: { 
                        message: 'User registration failed. Email might already be in use.'
                    }
                });
            }
            
            return {
                status: 303,
                headers: {
                    location: '/auth/login'
                },
                success: true,
                successMessage: 'Registration successful!'
            };
        } catch (error) {
            console.error('Unexpected error during registration:', error);
            return fail(400, { 
                data: { 
                    email: formData.email as string, 
                    password: formData.password as string 
                },
                errors: { 
                    message: 'Something went wrong. Please try again.'
                }
            });
        }
    }
};
