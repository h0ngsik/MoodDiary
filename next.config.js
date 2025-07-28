/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript 타입 체크를 빌드 시에도 유지
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint 에러가 있으면 빌드 실패
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
