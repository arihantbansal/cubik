


import "./src/env.mjs";



import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import { withAxiom } from 'next-axiom';





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
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  transpilePackages: ["@cubik/database"],
}

export default withAxiom(nextConfig)
