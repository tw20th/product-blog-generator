"use client";

import { useSearchParams } from "next/navigation";
import { useBlogs } from "@/hooks/useBlogs";
import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() || "";

  const { blogs } = useBlogs();
  const { items } = useMonitoredItems();

  const matchedBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(keyword) ||
      b.tags.some((t) => t.toLowerCase().includes(keyword))
  );

  const matchedItems = items.filter(
    (i) =>
      i.productName.toLowerCase().includes(keyword) ||
      i.featureHighlights?.some((f) => f.toLowerCase().includes(keyword)) ||
      i.tag?.some((t) => t.toLowerCase().includes(keyword))
  );

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">検索結果：{keyword}</h1>

      {/* ✅ 商品 */}
      {matchedItems.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2">一致した商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
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
        </section>
      )}

      {/* ✅ ブログ */}
      {matchedBlogs.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mt-6 mb-2">一致したブログ記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedBlogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <BlogCard
                  slug={blog.slug}
                  title={blog.title}
                  imageUrl={blog.imageUrl}
                  tags={blog.tags}
                  views={blog.views}
                  createdAt={blog.createdAt}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ ヒットなし */}
      {matchedItems.length === 0 && matchedBlogs.length === 0 && (
        <div className="text-gray-500">
          一致する結果が見つかりませんでした。
        </div>
      )}
    </main>
  );
}
