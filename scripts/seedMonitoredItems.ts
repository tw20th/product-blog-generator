import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../functions/service-account-key.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

const items = [
  {
    itemCode: "logicool_g304",
    name: "Logicool G304 ワイヤレスゲーミングマウス",
    genreId: "101164",
    price: 3980,
    point: 200,
    imageUrl: "https://example.com/image1.jpg",
    tags: ["ゲーミング", "マウス", "人気"],
  },
  {
    itemCode: "gtracing_chair",
    name: "GTRacing ゲーミングチェア",
    genreId: "101165",
    price: 19800,
    point: 990,
    imageUrl: "https://example.com/image2.jpg",
    tags: ["ゲーミング", "チェア", "快適"],
  },
];

items.forEach(async (item) => {
  await db
    .collection("monitoredItems")
    .doc(item.itemCode)
    .set({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  console.log(`✅ 登録完了: ${item.itemCode}`);
});
