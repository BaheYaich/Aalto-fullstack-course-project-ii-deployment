import { z } from 'zod';

export const questionSchema = z.object({
  question_text: z
    .string()
    .min(1, 'Question must be at least 1 character long')
    .max(100, 'Question must be less than 100 characters')
    .refine((text) => /^[a-zA-Z0-9\s\-?]+$/.test(text), {
      message: "Question can only contain letters, numbers, spaces, hyphens, and question marks"
    })
    .refine((text) => text.trim().endsWith('?'), {
      message: "Question must end with a question mark"
    })
    .transform(text => {
      // Capitalize first letter and ensure it ends with a question mark
      text = text.trim();
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!text.endsWith('?')) text += '?';
      return text;
    })
});