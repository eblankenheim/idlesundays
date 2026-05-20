/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Static export for S3 deployment
  // The build output will be in ./out/ directory
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
