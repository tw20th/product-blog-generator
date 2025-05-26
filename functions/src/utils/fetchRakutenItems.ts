import fetch from "node-fetch";
import { db } from "../firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore"; // ← 追加

const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;

if (!APPLICATION_ID) {
  throw new Error("RAKUTEN_APPLICATION_ID が .env に設定されていません");
}

export async function fetchRakutenItems(keyword: string): Promise<void> {
  const endpoint = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
  const params = new URLSearchParams({
    applicationId: APPLICATION_ID || "", // ← 修正
    keyword,
    hits: "10",
    format: "json"
  });

  const response = await fetch(`${endpoint}?${params.toString()}`);
  const data = await response.json();

  const now = new Date();

  for (const wrapper of data.Items) {
    const item = wrapper.Item;

    await db
      .collection("rakutenItems")
      .doc(item.itemCode)
      .set(
        {
          itemName: item.itemName,
          itemUrl: item.itemUrl,
          imageUrl: item.mediumImageUrls?.[0]?.imageUrl || "",
          price: item.itemPrice.toString(),
          genreId: item.genreId || "",
          productKeyword: keyword,
          lastFetchedAt: Timestamp.fromDate(now) // ← 修正
        },
        { merge: true }
      );

    console.log(`✅ 保存済み: ${item.itemName}`);
  }

  console.log("🏁 楽天商品取得完了");
}
