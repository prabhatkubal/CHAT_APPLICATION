/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

module.exports = {
  env: {
    BASE_URL: "http://localhost:4000",
  },
};