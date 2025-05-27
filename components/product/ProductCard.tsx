"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ProductCardProps = {
  id?: string;
  productName: string;
  price: string;
  imageUrl: string;
  score: number;
  featureHighlights?: string[];
  tag?: string[];
};

export const ProductCard = ({
  id,
  productName,
  price,
  imageUrl,
  score,
  featureHighlights,
  tag,
}: ProductCardProps) => {
  const card = (
    <motion.div
      className="bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col gap-2 hover:shadow-lg transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full h-48 relative">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h2 className="text-lg font-semibold line-clamp-2">{productName}</h2>
      <div className="text-gray-600 text-sm">
        {price ? `価格：${price} 円` : "※価格はリンク先でご確認ください"}
      </div>

      {Array.isArray(featureHighlights) && featureHighlights.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {featureHighlights.map((feature) => (
            <span
              key={feature}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-500">スコア</div>
        <span className="text-xl font-bold text-green-600">{score}</span>
      </div>

      {Array.isArray(tag) && tag.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tag.map((t) => (
            <span
              key={t}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  return id ? <Link href={`/product/${id}`}>{card}</Link> : card;
};
