import { z } from 'zod';

export const questionOptionSchema = z.object({
    option_text: z.string().min(1, "Option text is required"),
    is_correct: z.boolean()
}); 