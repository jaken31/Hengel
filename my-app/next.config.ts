/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization since it's not compatible with static exports
  images: {
    unoptimized: true,
  },
  // This setting makes sure static files get placed appropriately
  distDir: 'out'
}

module.exports = nextConfig