import { db } from "../firebaseAdmin";

type BlogData = {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string;
};

export async function postBlog(data: BlogData) {
  const now = new Date();
  const docRef = await db.collection("blogs").add({
    ...data,
    createdAt: now.toISOString(),
    views: 0
  });

  return { success: true, id: docRef.id };
}
