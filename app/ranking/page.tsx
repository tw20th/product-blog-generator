"use client";

import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";

export default function RankingPage() {
  const { items, loading } = useMonitoredItems();

  const sorted = [...items].sort((a, b) => b.score - a.score).reverse();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">人気ランキング（スコア順）</h1>

      {loading ? (
        <div>読み込み中...</div>
      ) : sorted.length === 0 ? (
        <div>商品データがありません</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.span
                layoutId={`rank-${index + 1}`}
                className="absolute -top-2 -left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full shadow-md z-10"
              >
                #{index + 1}
              </motion.span>

              <ProductCard
                id={item.id}
                productName={item.productName}
                price={item.price}
                imageUrl={
                  item.imageUrl ??
                  `/images/${item.imageKeyword ?? "no-image"}.jpg`
                }
                score={item.score}
                featureHighlights={item.featureHighlights}
                tag={item.tag}
              />
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
