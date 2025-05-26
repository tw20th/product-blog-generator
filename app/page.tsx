"use client";

import { useBlogs } from "@/hooks/useBlogs";
import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { useSortedBlogs } from "@/hooks/useSortedBlogs";
import { ProductCard } from "@/components/product/ProductCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryButtons } from "@/components/common/CategoryButtons";

export default function HomePage() {
  const { blogs, loading: loadingBlogs } = useBlogs();
  const { items, loading: loadingItems } = useMonitoredItems();

  const topBlogs = useSortedBlogs(blogs, "viewsDesc").slice(0, 3);
  const topItems = [...items].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <main className="p-4 space-y-10">
      {/* ✅ Hero セクション */}
      <section className="text-center py-10 bg-gray-100 rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          最高のゲーミングチェアを見つけよう
        </h1>
        <p className="text-gray-600 mb-4">
          比較・ランキング・ブログですべてがわかる。
        </p>
        <a
          href="/ranking"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          人気ランキングを見る
        </a>
      </section>

      {/* ✅ カテゴリ導線 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">カテゴリから探す</h2>
        <CategoryButtons />
      </section>

      {/* ✅ 人気ブログ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">人気ブログ記事</h2>
          <a href="/blog" className="text-sm text-blue-600 hover:underline">
            すべての記事を見る →
          </a>
        </div>

        {loadingBlogs ? (
          <div>読み込み中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topBlogs.map((blog) => (
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

      {/* ✅ 注目商品ランキング */}
      <section>
        <h2 className="text-2xl font-bold mb-4">注目のゲーミングチェア</h2>
        {loadingItems ? (
          <div>読み込み中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topItems.map((item) => (
              <ProductCard
                key={item.id}
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
    </main>
  );
}
