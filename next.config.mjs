/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "descriptive-falcon-496.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
