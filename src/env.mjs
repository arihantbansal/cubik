import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PROD_DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
  },
  client: {
    NEXT_PUBLIC_RPC_URL: z.string().min(1),
    NEXT_PUBLIC_HELIUS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDNAME: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY: z.string().min(1),
    NEXT_PUBLIC_NOTION_TOKEN: z.string().min(1),
    NEXT_PUBLIC_NOTION_DATABASEID: z.string().min(1),
    NEXT_PUBLIC_NOTION_PAGEID: z.string().min(1),
    NEXT_PUBLIC_MIXPANEL: z.string().min(1),
  },
  runtimeEnv: {
    PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_CLOUDINARY: process.env.NEXT_PUBLIC_CLOUDINARY,
    NEXT_PUBLIC_CLOUDNAME: process.env.NEXT_PUBLIC_CLOUDNAME,
    NEXT_PUBLIC_HELIUS_API_KEY: process.env.NEXT_PUBLIC_HELIUS_API_KEY,
    NEXT_PUBLIC_NOTION_DATABASEID: process.env.NEXT_PUBLIC_NOTION_DATABASEID,
    NEXT_PUBLIC_NOTION_TOKEN: process.env.NEXT_PUBLIC_NOTION_TOKEN,
    NEXT_PUBLIC_NOTION_PAGEID: process.env.NEXT_PUBLIC_NOTION_PAGEID,
    NEXT_PUBLIC_MIXPANEL: process.env.NEXT_PUBLIC_MIXPANEL,
  },
});
