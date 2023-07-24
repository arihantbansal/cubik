/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    // if (isServer) {
    //   config.plugins = [...config.plugins];
    // }
    return config;
  },
};

module.exports = nextConfig;
