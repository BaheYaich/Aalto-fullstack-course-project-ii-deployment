import { z } from 'zod';

export const questionOptionSchema = z.object({
    option_text: z.string()
        .min(1, "Option text is required")
        .max(255, "Option text cannot exceed 255 characters")
        .trim()
        .regex(/^[a-zA-Z0-9\s.,!?'"-,]+$/, "Option text can only contain letters, numbers, commas, and basic punctuation")
        .transform(text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()),
    is_correct: z.boolean()
        .default(false)
}); 