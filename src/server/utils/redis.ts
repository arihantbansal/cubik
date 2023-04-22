import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL as string,
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
});

export { redis };
