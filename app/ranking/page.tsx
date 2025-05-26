"use client";

import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductCard } from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import { MonitoredItem } from "@/types/item";

export default function RankingPage() {
  const { items, loading } = useMonitoredItems();
  const [topItems, setTopItems] = useState<MonitoredItem[]>([]);

  useEffect(() => {
    if (!loading) {
      const sorted = [...items].sort((a, b) => b.score - a.score).slice(0, 10);
      setTopItems(sorted);
    }
  }, [items, loading]);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">スコアランキング TOP10</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topItems.map((item, index) => (
          <div key={item.id} className="relative">
            <span className="absolute -top-2 -left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              #{index + 1}
            </span>
            <ProductCard
              productName={item.productName}
              price={item.price}
              imageUrl={`/images/${item.imageKeyword}.jpg`}
              score={item.score}
              featureHighlights={item.featureHighlights}
              tag={item.tag}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
