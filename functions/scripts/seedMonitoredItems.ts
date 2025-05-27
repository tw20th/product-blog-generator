// functions/scripts/seedMonitoredItems.ts
import { db } from "../src/firebaseAdmin";
import { isItemEligible } from "../src/utils/applyItemFilter";

type RakutenItem = {
  id: string;
  itemName: string;
  price: string;
  imageUrl?: string;
  itemUrl?: string;
  productKeyword?: string;
};

export async function selectAndSaveMonitoredItems() {
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
      imageUrl: item.imageUrl || "",
      itemUrl: item.itemUrl || "",
      features: "快適な座り心地と高い耐久性",
      imageKeyword: item.productKeyword || "ゲーミングチェア",
      fromRakutenItemId: item.id,
      score: 0,
      tag: [],
      featureHighlights: [],
      createdAt: now.toISOString()
    });

    console.log(`✅ 登録: ${item.itemName}`);
  }

  console.log(`🏁 完了: ${selected.length} 件を monitoredItems に登録`);
}

// 末尾に実行
selectAndSaveMonitoredItems();
