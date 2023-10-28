import { z } from 'zod';

export const uploadFromURLSchema = z.object({
  body: z.object({
    urls: z.array(z.string()),
  }),
});
