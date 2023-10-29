/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cubik/ui"],
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
  },
};

module.exports = nextConfig;
