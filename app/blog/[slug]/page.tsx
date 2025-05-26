// app/blog/[slug]/page.tsx
import { db } from "@/lib/firebaseClient";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

type Props = {
  params: { slug: string };
};

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  createdAt: string; // ← 修正ポイント（Timestamp → string）
};

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: Props) {
  const q = query(collection(db, "blogs"), where("slug", "==", params.slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return notFound();

  const doc: QueryDocumentSnapshot<DocumentData> = snapshot.docs[0];
  const data = doc.data() as BlogPost;

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <Image
        src={data.imageUrl}
        alt={data.title}
        width={800}
        height={500}
        className="rounded"
      />
      <div className="text-sm text-gray-600">
        投稿日時: {new Date(data.createdAt).toLocaleString()}
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
        >
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
