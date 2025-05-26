import { notFound } from "next/navigation";
import { Blog } from "@/types/blog";
import { db } from "@/lib/firebaseClient";
import { getDocs, collection, query, where } from "firebase/firestore";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogMarkdownRenderer } from "@/components/blog/BlogMarkdownRenderer";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export default async function BlogDetailPage({ params }: Props) {
  const q = query(collection(db, "blogs"), where("slug", "==", params.slug));
  const snapshot = await getDocs(q);
  const data = snapshot.docs[0]?.data() as Blog;

  if (!data) return notFound();

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      {data.imageUrl && (
        <div className="relative w-full h-60">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold">{data.title}</h1>

      <div className="text-sm text-gray-500 flex gap-4">
        <span>📅 {new Date(data.createdAt).toLocaleDateString()}</span>
        <span>👁 {data.views} views</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.isArray(data.tags) &&
          data.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
            >
              #{tag}
            </span>
          ))}
      </div>

      <TableOfContents content={data.content} />
      <BlogMarkdownRenderer content={data.content} />
    </main>
  );
}
