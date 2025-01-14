import { describe, it, expect } from 'vitest';
import { loginSchema, registrationSchema } from '$lib/validation/authSchema';

describe('Auth Validation', () => {
    describe('Login Schema', () => {
        it('should validate correct login credentials', () => {
            const input = {
                email: 'test@example.com',
                password: '123456'
            };
            const result = loginSchema.safeParse(input);
            expect(result.success).toBe(true);
        });

        it('should fail on invalid email', () => {
            const input = {
                email: 'invalid-email',
                password: '123456'
            };
            const result = loginSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].path[0]).toBe('email');
            }
        });

        it('should fail on empty password', () => {
            const input = {
                email: 'test@example.com',
                password: ''
            };
            const result = loginSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].path[0]).toBe('password');
            }
        });
    });

    describe('Register Schema', () => {
        it('should validate correct registration data', () => {
            const input = {
                email: 'test@example.com',
                password: 'TestPass123!',
                confirmPassword: 'TestPass123!'
            };
            const result = registrationSchema.safeParse(input);
            expect(result.success).toBe(true);
        });

        it('should fail when password is too short', () => {
            const input = {
                email: 'test@example.com',
                password: 'Tt1!',
                confirmPassword: 'Tt1!'
            };
            const result = registrationSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Password must be at least 6 characters long');
            }
        });

        it('should fail when password lacks uppercase', () => {
            const input = {
                email: 'test@example.com',
                password: 'testpass123!',
                confirmPassword: 'testpass123!'
            };
            const result = registrationSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Password must contain at least one uppercase letter');
            }
        });

        it('should fail when password lacks special character', () => {
            const input = {
                email: 'test@example.com',
                password: 'TestPass123',
                confirmPassword: 'TestPass123'
            };
            const result = registrationSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Password must contain at least one special character');
            }
        });
    });
}); 