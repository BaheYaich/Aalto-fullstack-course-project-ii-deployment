import { z } from 'zod';

export const topicSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Topic name cannot be empty" })
    .max(50, { message: "Topic name cannot be longer than 50 characters" })
    .trim()
    .refine((name) => /^[a-zA-Z0-9\s-]+$/.test(name), {
      message: "Topic name can only contain letters, numbers, spaces, and hyphens"
    })
});