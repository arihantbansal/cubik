//@ts-ignore
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
/** @type {import("next").NextConfig} */
const config = {
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
  transpilePackages: ["@cubik/database"],
  experimental: { serverActions: true, appDir: true },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        pathname: "/demonicirfan/image/upload/**",
        port: "",
      },
    ],
    domains: [
      "d1yweukyu067aq.cloudfront.net",
      "www.sandstormhackathon.com",
      "media-fastly.hackerearth.com",
      "res.cloudinary.com",
      "source.boringavatars.com",
      "uploadthing.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
