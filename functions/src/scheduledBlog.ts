import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { generateBlogContent } from "./prompts/blogPrompt";
import { fetchCoverImage } from "./utils/fetchImage";
import { postBlog } from "./utils/postBlog";

export async function scheduledBlog() {
  try {
    console.log("🔁 自動投稿スクリプト開始");

    const topic = "子供向け英会話教室の選び方";
    const slug = `english-lesson-${Date.now()}`;

    const content = await generateBlogContent(topic);
    const imageUrl = await fetchCoverImage(topic);

    const result = await postBlog({
      title: topic,
      slug,
      content,
      imageUrl,
      category: "英会話",
      tags: ["英会話", "子供", "習い事"]
    });

    console.log("✅ 投稿完了:", result.id);
    return result;
  } catch (err) {
    console.error("❌ 自動投稿エラー:", err);
    return { success: false, error: String(err) };
  }
}

// ✅ ここを追加！関数を実行しないと何も起きません
scheduledBlog();
