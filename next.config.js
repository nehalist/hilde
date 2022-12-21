/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  publicRuntimeConfig: {
    season: process.env.SEASON || 1,
  }
};

module.exports = nextConfig;
