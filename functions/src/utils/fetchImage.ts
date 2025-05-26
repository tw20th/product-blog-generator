import fetch from "node-fetch";
import { config } from "firebase-functions";
import * as dotenv from "dotenv";
dotenv.config(); // .env対応

const accessKey = config()?.unsplash?.access_key ?? process.env.UNSPLASH_ACCESS_KEY;

if (!accessKey) {
  throw new Error("Unsplash APIキーが未設定です");
}

export async function fetchCoverImage(keyword: string): Promise<string> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${accessKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Unsplash API request failed: ${res.status}`);
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("画像が見つかりませんでした");
  }

  return data.results[0].urls.regular;
}
