"use client";

import { useBlogs } from "@/hooks/useBlogs";
import { useSortedBlogs } from "@/hooks/useSortedBlogs";
import { BlogCard } from "@/components/blog/BlogCard";
import {
  BlogSortSelect,
  BlogSortOption,
} from "@/components/blog/BlogSortSelect";
import { useState } from "react";

export default function BlogPage() {
  const { blogs, loading } = useBlogs();
  const [sort, setSort] = useState<BlogSortOption>("latest");
  const sortedBlogs = useSortedBlogs(blogs, sort);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">ブログ一覧</h1>

      <div className="mb-4">
        <BlogSortSelect value={sort} onChange={setSort} />
      </div>

      {sortedBlogs.length === 0 ? (
        <div>記事が見つかりませんでした。</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBlogs.map((blog) => (
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
    </main>
  );
}
