/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/uploads/**",
      },

      {
        protocol: "https",
        hostname: "greenbasket-backend-t23g.onrender.com",
        pathname: "/api/uploads/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
  protocol: "https",
  hostname: "res.cloudinary.com",
  pathname: "/**",
},
    ],
  },
};

export default nextConfig;