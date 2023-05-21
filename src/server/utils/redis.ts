import { Redis } from '@upstash/redis';
// import { env } from '~/env.mjs';
const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL as string, // add this in env.mjs t3 env when we use it
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
});

export { redis };
