import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { fetchRakutenItems } from "./utils/fetchRakutenItems";

export async function scheduledRakuten(): Promise<{ success: boolean; error?: string }> {
  try {
    const keywords = ["ゲーミングチェア", "デスクライト"];
    for (const keyword of keywords) {
      console.log(`🔍 キーワード: ${keyword}`);
      await fetchRakutenItems(keyword);
    }
    console.log("✅ [楽天自動取得] 完了");
    return { success: true };
  } catch (err) {
    console.error("❌ [楽天自動取得] エラー:", err);
    return { success: false, error: String(err) };
  }
}
