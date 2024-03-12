/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/dev-open-hacku-bucket/**'
      }
    ],
    domains: ['lh3.googleusercontent.com']
  }
};

export default nextConfig;
