// functions/index.ts

import * as functions from "firebase-functions";
import { scheduledBlog } from "./src/scheduledBlog";
import { scheduledRakuten } from "./src/scheduledRakuten";

export const generateBlogDailyV1 = functions.pubsub
  .schedule("0 6 * * *") // 毎日朝6時（JST）
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    console.log("🕒 [Cron] Generating blog (v1)...");
    try {
      await scheduledBlog();
      console.log("✅ Blog generation complete.");
    } catch (error) {
      console.error("❌ Blog generation failed:", error);
    }
  });

export const fetchRakutenDaily = functions.pubsub
  .schedule("0 5 * * *") // JSTで毎日朝5時
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    console.log("🕔 [Cron] Fetching Rakuten items...");
    await scheduledRakuten();
  });
