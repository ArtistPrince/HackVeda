/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Static frontend will be on Hostinger, API will be on Vercel
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
};

module.exports = nextConfig;