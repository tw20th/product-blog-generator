// app/blog/page.tsx
import { db } from "@/lib/firebaseClient";
import {
  collection,
  getDocs,
  query,
  orderBy,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  createdAt: string; // ← 修正ポイント（Timestamp → string）
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const posts: BlogPost[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      };
    }
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">ブログ一覧</h1>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded space-y-2">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {post.title}
            </h2>
          </Link>
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="rounded"
          />
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
