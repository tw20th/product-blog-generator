"use client";

import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/common/SortSelect";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MonitoredItem } from "@/types/item";

type SortOption = "scoreDesc" | "priceAsc" | "priceDesc";

export default function CategoryPage() {
  const { tag } = useParams();
  const { items, loading } = useMonitoredItems();
  const [filtered, setFiltered] = useState<MonitoredItem[]>([]);
  const [sort, setSort] = useState<SortOption>("scoreDesc");

  useEffect(() => {
    if (!loading && typeof tag === "string") {
      let matched = items.filter((item) => item.tag.includes(tag));

      switch (sort) {
        case "scoreDesc":
          matched = matched.sort((a, b) => b.score - a.score);
          break;
        case "priceAsc":
          matched = matched.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case "priceDesc":
          matched = matched.sort((a, b) => Number(b.price) - Number(a.price));
          break;
      }

      setFiltered(matched);
    }
  }, [tag, items, loading, sort]);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">カテゴリ：{tag}</h1>

      <div className="mb-4">
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {filtered.length === 0 ? (
        <div>該当する商品が見つかりませんでした。</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ProductCard
              key={item.id}
              productName={item.productName}
              price={item.price}
              imageUrl={`/images/${item.imageKeyword}.jpg`} // 仮画像
              score={item.score}
              featureHighlights={item.featureHighlights}
              tag={item.tag}
            />
          ))}
        </div>
      )}
    </main>
  );
}
