/** @type {import('next').NextConfig} */
module.exports = {
  // https://stackoverflow.com/a/68984030
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ];
  },
  reactStrictMode: true,
};
