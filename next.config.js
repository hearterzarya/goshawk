/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Allow unoptimized images for local uploads (better for Vercel)
    unoptimized: process.env.NODE_ENV === 'production' ? false : false,
    // Allow local images
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
