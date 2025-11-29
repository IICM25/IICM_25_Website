import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   domains: [
      "firebasestorage.googleapis.com",
      "storage.googleapis.com", // if you use this host anywhere
      "lh3.googleusercontent.com" // common for avatars, optional
    ],
};

export default nextConfig;
