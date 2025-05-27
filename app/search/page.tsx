"use client";

import { useSearchParams } from "next/navigation";
import { useBlogs } from "@/hooks/useBlogs";
import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProductCard } from "@/components/product/ProductCard";
import { useMemo } from "react";

export default function SearchPage() {
  const { blogs, loading: loadingBlogs } = useBlogs();
  const { items, loading: loadingItems } = useMonitoredItems();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() ?? "";

  const matchedBlogs = useMemo(() => {
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(keyword) ||
        b.tags.some((t) => t.toLowerCase().includes(keyword))
    );
  }, [blogs, keyword]);

  const matchedItems = useMemo(() => {
    return items.filter((item) => {
      return (
        item.productName.toLowerCase().includes(keyword) ||
        (Array.isArray(item.tag) &&
          item.tag.some((t) => t.toLowerCase().includes(keyword))) ||
        item.featureHighlights?.some((f) => f.toLowerCase().includes(keyword))
      );
    });
  }, [items, keyword]);

  const loading = loadingBlogs || loadingItems;

  return (
    <main className="p-4 space-y-10">
      <h1 className="text-2xl font-bold">
        検索結果：「{keyword || "未入力"}」
      </h1>

      {loading ? (
        <div>読み込み中...</div>
      ) : (
        <>
          {/* 🎯 商品の検索結果 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              商品（{matchedItems.length}件）
            </h2>
            {matchedItems.length === 0 ? (
              <div>該当する商品が見つかりませんでした。</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    productName={item.productName}
                    price={item.price}
                    imageUrl={`/images/${item.imageKeyword}.jpg`}
                    score={item.score}
                    featureHighlights={item.featureHighlights}
                    tag={item.tag}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 📝 ブログの検索結果 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              ブログ（{matchedBlogs.length}件）
            </h2>
            {matchedBlogs.length === 0 ? (
              <div>該当するブログ記事が見つかりませんでした。</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    slug={blog.slug}
                    title={blog.title}
                    imageUrl={blog.imageUrl}
                    tags={blog.tags}
                    views={blog.views}
                    createdAt={blog.createdAt}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
