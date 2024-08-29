/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['cdn.dummyjson.com'],  // Add the domain here
    },
    env: {
        SEND_CODE: '/api/send-email'
    }
};

export default nextConfig;
