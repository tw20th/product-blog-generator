import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { generateBlogContent } from "./prompts/blogPrompt";
import { fetchCoverImage } from "./utils/fetchImage";
import { postBlog } from "./utils/postBlog";
import { getMonitoredItemRandom } from "./utils/getMonitoredItem";
import { db } from "./firebaseAdmin"; // ← 追加

export async function scheduledBlog() {
  try {
    console.log("🔁 自動投稿スクリプト開始");

    const item = await getMonitoredItemRandom();
    const { productName, price, features, imageKeyword, id: productId } = item;

    // ✅ 1. 重複チェックを追加
    const existingBlogs = await db
      .collection("blogs")
      .where("productId", "==", productId)
      .limit(1)
      .get();

    if (!existingBlogs.empty) {
      console.log(`⚠ ブログはすでに存在します（productId: ${productId}）`);
      return { success: false, reason: "duplicate", productId };
    }

    // ✅ 2. 通常通りブログ生成
    const title = `${productName} レビューとおすすめポイント`;
    const slug = `blog-${Date.now()}`;
    const category = "ゲーミングチェア";
    const rawTags = ["ゲーミングチェア", productName, "在宅ワーク"];
    const tags = rawTags.filter(
      (tag): tag is string => typeof tag === "string" && tag.trim() !== ""
    );

    const content = await generateBlogContent({
      productName,
      price,
      features
    });

    const imageUrl = await fetchCoverImage(imageKeyword);

    const result = await postBlog({
      title,
      slug,
      content,
      imageUrl,
      category,
      tags,
      productId
    });

    console.log("✅ 投稿完了:", result.id);
    return result;
  } catch (err) {
    console.error("❌ 自動投稿エラー:", err);
    return { success: false, error: String(err) };
  }
}
