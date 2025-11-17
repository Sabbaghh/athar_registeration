import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'api.qrserver.com'],
  },
};

export default nextConfig;
