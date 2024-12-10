import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string()
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email must be less than 100 characters')
    .email('Please enter a valid email address'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be less than 64 characters')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must include at least one uppercase letter, one lowercase letter, and one number'
    )
});