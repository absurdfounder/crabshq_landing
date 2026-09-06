/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  transpilePackages: ['@trooper/demo', '@bible-strong/avatar-core', '@bible-strong/avatar-react'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    outputFileTracingIncludes: {
      '/og/img/[...segments]/route': ['./public/og-fonts/**/*'],
      '/og/route': ['./public/og-fonts/**/*'],
    },
  },
  async redirects() {
    return [
      {
        source: '/integrations',
        destination: '/plugin',
        permanent: true,
      },
      {
        source: '/integrations/:slug',
        destination: '/plugin/ai_agent_for_:slug',
        permanent: true,
      },
      {
        source: '/character-builder',
        destination: '/characters',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/character-studio',
        destination: '/character-studio/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/og/prebuilt/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
    ];
  },
};

// First-party proxy so adblockers don't drop Plausible (script + events on trooper.so).
// Subdirectory "q" avoids blocked path names like analytics / plausible / stats.
// @see https://plausible.io/docs/proxy/guides/nextjs
module.exports = withPlausibleProxy({
  subdirectory: 'q',
})(nextConfig);
