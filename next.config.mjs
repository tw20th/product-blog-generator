/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "thumbnail.image.rakuten.co.jp", // ← 楽天の画像
      "example.com", // ← 今回のエラー対象ドメイン
    ],
  },
};

export default nextConfig;
