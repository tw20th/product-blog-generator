import { onSchedule } from "firebase-functions/v2/scheduler";
import { scheduledBlog } from "./src/scheduledBlog";

export const generateBlogDaily = onSchedule(
  {
    schedule: "0 6 * * *",
    timeZone: "Asia/Tokyo"
  },
  async () => {
    console.log("🕒 [Cron] Generating blog...");
    try {
      await scheduledBlog();
      console.log("✅ Blog generation complete.");
    } catch (error) {
      console.error("❌ Blog generation failed:", error);
    }
  }
);
