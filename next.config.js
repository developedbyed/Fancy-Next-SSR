/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: { domains: ["lh3.googleusercontent.com", "images.clerk.dev"] },
}

module.exports = nextConfig
