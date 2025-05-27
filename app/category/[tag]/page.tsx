"use client";

import { useParams } from "next/navigation";
import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductCard } from "@/components/product/ProductCard";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { MonitoredItem } from "@/types/item";
import { SearchInput } from "@/components/common/SearchInput";
import { motion } from "framer-motion"; // ✅ 追加

export default function CategoryPage() {
  const { tag } = useParams();
  const { items, loading } = useMonitoredItems();
  const [filtered, setFiltered] = useState<MonitoredItem[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!loading && typeof tag === "string") {
      const matched = items.filter(
        (item) => Array.isArray(item.tag) && item.tag.includes(tag)
      );
      setFiltered(matched);
    }
  }, [tag, items, loading]);

  const searched = filtered.filter((item) => {
    const keywordLower = keyword.toLowerCase();
    return (
      item.productName.toLowerCase().includes(keywordLower) ||
      (Array.isArray(item.tag) &&
        item.tag.some((t) => t.toLowerCase().includes(keywordLower))) ||
      item.featureHighlights?.some((f) =>
        f.toLowerCase().includes(keywordLower)
      )
    );
  });

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    goToPage,
  } = usePagination(searched, 6);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">カテゴリ：{tag}</h1>

      <SearchInput keyword={keyword} onChange={setKeyword} />

      {searched.length === 0 ? (
        <div>該当する商品が見つかりませんでした。</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard
                  id={item.id}
                  productName={item.productName}
                  price={item.price}
                  imageUrl={`/images/${item.imageKeyword}.jpg`}
                  score={item.score}
                  featureHighlights={item.featureHighlights}
                  tag={item.tag}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ← 前へ
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              次へ →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
