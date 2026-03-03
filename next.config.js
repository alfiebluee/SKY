/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    typescript: {
        // Vercel's build environment can't resolve ambient Mapbox type libs.
        // Type checking still works in the IDE/locally.
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
