await import('./src/env.mjs');
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  transpilePackages: ['@cubik/api', '@cubik/database'],
  images: {
    domains: [
      'd1yweukyu067aq.cloudfront.net',
      'www.sandstormhackathon.com',
      'media-fastly.hackerearth.com',
      'res.cloudinary.com',
    ],
  },
};

export default nextConfig;
