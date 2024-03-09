/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/image-upload-demo-a-open-hack-u/**'
      }
    ]
  }
};

export default nextConfig;
