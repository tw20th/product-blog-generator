import { db } from "../firebaseAdmin";

export type MonitoredItem = {
  productName: string;
  price: string;
  features: string;
  imageKeyword: string;
};

export async function getMonitoredItemRandom(): Promise<MonitoredItem> {
  const snapshot = await db.collection("monitoredItems").get();

  console.log("📦 monitoredItems 件数:", snapshot.size);
  console.log(
    "📄 docIds:",
    snapshot.docs.map(d => d.id)
  );

  const docs = snapshot.docs.map(doc => doc.data() as MonitoredItem);

  if (docs.length === 0) throw new Error("monitoredItems が空です");

  const random = docs[Math.floor(Math.random() * docs.length)];
  return random;
}
