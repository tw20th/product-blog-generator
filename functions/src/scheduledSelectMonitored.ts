// functions/src/scheduledSelectMonitored.ts

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { db } from "../src/firebaseAdmin";
import { isItemEligible } from "../src/utils/applyItemFilter";
import { updatePriceHistory } from "../src/utils/updatePriceHistory"; // ← 価格履歴追加

type RakutenItem = {
  id: string;
  itemName: string;
  price: string;
  productKeyword?: string;
};

// ✅ 関数名を index.ts と一致させる
export async function scheduledSelectMonitored() {
  const snapshot = await db.collection("rakutenItems").get();
  const now = new Date();

  const items: RakutenItem[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<RakutenItem, "id">)
  }));

  const selected = items.filter(isItemEligible);

  for (const item of selected) {
    const monitoredRef = await db.collection("monitoredItems").add({
      productName: item.itemName,
      price: item.price,
      features: "快適な座り心地と高い耐久性",
      imageKeyword: item.productKeyword || "ゲーミングチェア",
      fromRakutenItemId: item.id,
      score: 0,
      tag: [],
      featureHighlights: [],
      createdAt: now.toISOString()
    });

    console.log(`✅ 登録: ${item.itemName}`);

    // 📈 priceHistory を追加保存
    await updatePriceHistory(monitoredRef.id, parseInt(item.price));
  }

  console.log(`🏁 完了: ${selected.length} 件を monitoredItems に登録`);
}
