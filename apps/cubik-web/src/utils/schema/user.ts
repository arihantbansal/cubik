import { z } from 'zod';

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .max(15, {
      message: 'Username must be at most 15 characters long',
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Username must be alphanumeric and no spaces',
    }),
});
