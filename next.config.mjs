/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
};
export default nextConfig;
