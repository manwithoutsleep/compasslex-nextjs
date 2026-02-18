import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname,
    },
    images: {
        // Enable modern image formats for better performance
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        // Optimize package imports for better tree-shaking
        optimizePackageImports: ['@googlemaps/js-api-loader'],
    },
    // Enable static export if no server features are needed in the future
    // output: 'export',
}

export default nextConfig
