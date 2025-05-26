import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { db } from "./firebaseAdmin";
import { isItemEligible } from "./utils/applyItemFilter";

type RakutenItem = {
  id: string;
  itemName: string;
  price: string;
  productKeyword?: string;
};

export async function scheduledSelectMonitored() {
  console.log("🔁 monitoredItems 自動選定 開始");

  const snapshot = await db.collection("rakutenItems").get();
  const now = new Date();

  const items: RakutenItem[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<RakutenItem, "id">)
  }));

  const selected = items.filter(isItemEligible);

  for (const item of selected) {
    await db.collection("monitoredItems").add({
      productName: item.itemName,
      price: item.price,
      features: "快適な座り心地と高い耐久性",
      imageKeyword: item.productKeyword || "ゲーミングチェア",
      fromRakutenItemId: item.id,
      createdAt: now.toISOString()
    });

    console.log(`✅ 登録: ${item.itemName}`);
  }

  console.log(`🏁 完了: ${selected.length} 件を monitoredItems に登録`);
}
