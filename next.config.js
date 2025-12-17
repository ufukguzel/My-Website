/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  env: {
    RAINDROP_ACCESS_TOKEN: process.env.RAINDROP_ACCESS_TOKEN,
    PLAYAI_API_KEY: process.env.PLAYAI_API_KEY,
    NEXT_PUBLIC_RAINDROP_COLLECTION_ID: process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID,
    NEXT_PUBLIC_PLAYAI_API_KEY: process.env.NEXT_PUBLIC_PLAYAI_API_KEY,
  },
};

module.exports = nextConfig;