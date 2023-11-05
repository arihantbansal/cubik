
import { withAxiom } from "next-axiom";








/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: ["@cubik/ui"],
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
  },
};

export default withAxiom(nextConfig);
