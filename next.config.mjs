/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is open: the old holding page sends visitors to the home page.
  // (app/coming-soon stays so the gate can come back if it's ever needed.)
  async redirects() {
    return [{ source: "/coming-soon", destination: "/", permanent: false }];
  },
};

export default nextConfig;
