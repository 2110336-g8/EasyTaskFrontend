/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'easytask-se2-bucket.s3.ap-southeast-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    publicRuntimeConfig: {
        NEXT_PUBLIC_BACK_HOSTNAME: process.env.NEXT_PUBLIC_BACK_HOSTNAME,
    },
};

export default nextConfig;
