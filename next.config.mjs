/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/app",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/app',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig