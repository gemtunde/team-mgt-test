/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable strict TypeScript checking
    tsconfigPath: "./tsconfig.json",
  },
  experimental: {
    // Enable strict mode for better performance
    strictNextHead: true,
  },
};

export default nextConfig;
