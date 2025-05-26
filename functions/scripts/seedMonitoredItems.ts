import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../service-account-key.json";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

try {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  });
} catch {
  console.log("⚠️ Firebase Admin はすでに初期化されています");
}

const db = getFirestore();

const monitoredItems = [
  {
    productName: "GTRacing GT002",
    price: "19800",
    features: "リクライニング、ランバーサポート、フットレスト",
    imageKeyword: "gaming chair"
  },
  {
    productName: "AKRacing Pro-X V2",
    price: "49800",
    features: "高級PUレザー、4Dアームレスト、耐久性抜群",
    imageKeyword: "ergonomic gaming chair"
  },
  {
    productName: "Dowinx LS-6688",
    price: "24800",
    features: "マッサージ機能、PUレザー、ロッキング機能付き",
    imageKeyword: "massage gaming chair"
  }
];

async function seed() {
  const batch = db.batch();
  const collectionRef = db.collection("monitoredItems");

  monitoredItems.forEach(item => {
    const docRef = collectionRef.doc(); // 自動ID
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log("✅ monitoredItems 登録完了");
}

seed().catch(err => {
  console.error("❌ 登録エラー:", err);
});
