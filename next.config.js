/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    domains: [
      'd1yweukyu067aq.cloudfront.net',
      'www.sandstormhackathon.com',
      'media-fastly.hackerearth.com',
    ],
  },
};

module.exports = nextConfig;
