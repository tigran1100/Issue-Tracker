/** @type {import('next').NextConfig} */
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

const nextConfig = { reactStrictMode: false };

export default nextConfig;
