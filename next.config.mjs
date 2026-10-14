/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is open (it was held behind /coming-soon until launch); links
  // to the old holding page land on the home page.
  async redirects() {
    return [{ source: "/coming-soon", destination: "/", permanent: false }];
  },
};

export default nextConfig;
