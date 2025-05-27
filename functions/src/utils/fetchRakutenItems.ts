// functions/src/utils/fetchRakutenItems.ts
import fetch from "node-fetch";
import { db } from "../firebaseAdmin";
import { config } from "firebase-functions";
import * as dotenv from "dotenv";
dotenv.config();

const applicationId = config().rakuten?.app_id ?? process.env.RAKUTEN_APP_ID;

if (!applicationId) {
  throw new Error("Rakuten Application ID が未設定です");
}

// ✅ Rakuten API レスポンス型を定義
type RakutenResponse = {
  Items: {
    Item: {
      itemCode: string;
      itemName: string;
      itemPrice: number;
      mediumImageUrls: { imageUrl: string }[];
    };
  }[];
};

export async function fetchRakutenItems(keyword: string): Promise<void> {
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${encodeURIComponent(
    keyword
  )}&applicationId=${applicationId}&hits=30&sort=-updateTimestamp`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Rakuten API fetch failed: ${res.status}`);

  // ✅ 型アサーション追加
  const data = (await res.json()) as RakutenResponse;

  const now = new Date();

  for (const wrapper of data.Items) {
    const item = wrapper.Item;

    await db.collection("rakutenItems").add({
      itemCode: item.itemCode,
      itemName: item.itemName,
      price: item.itemPrice,
      imageUrl: item.mediumImageUrls?.[0]?.imageUrl ?? "",
      createdAt: now.toISOString()
    });

    console.log(`✅ 取得: ${item.itemName}`);
  }

  console.log("🏁 全件保存完了");
}
