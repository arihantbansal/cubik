import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';





export const env = createEnv({
  server: {
    PROD_DATABASE_URL: z.string().url(),
    UPLOADTHING_APP_ID: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    SECRET: z.string().min(1),
    EDGE_CONFIG: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_RPC_MAINNET_URL: z.string().min(1),
    NEXT_PUBLIC_RPC_DEVNET_URL: z.string().min(1),
    NEXT_PUBLIC_HELIUS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_MIXPANEL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_SOLANA_NETWORK: z.string().min(1),
    NEXT_PUBLIC_ADMIN_VAULT: z.string().min(1),
    NEXT_PUBLIC_URL_BASE: z.string().min(1),
    NEXT_PUBLIC_BACKEND: z.string().min(1),
  },
  runtimeEnv: {
    SECRET: process.env.SECRET,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
    PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
    EDGE_CONFIG:process.env.EDGE_CONFIG,
    NEXT_PUBLIC_RPC_MAINNET_URL: process.env.NEXT_PUBLIC_RPC_MAINNET_URL,
    NEXT_PUBLIC_RPC_DEVNET_URL: process.env.NEXT_PUBLIC_RPC_DEVNET_URL,
    NEXT_PUBLIC_HELIUS_API_KEY: process.env.NEXT_PUBLIC_HELIUS_API_KEY,
    NEXT_PUBLIC_MIXPANEL: process.env.NEXT_PUBLIC_MIXPANEL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SOLANA_NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
    NEXT_PUBLIC_ADMIN_VAULT: process.env.NEXT_PUBLIC_ADMIN_VAULT,
    NEXT_PUBLIC_URL_BASE: process.env.NEXT_PUBLIC_URL_BASE,
  },
});
