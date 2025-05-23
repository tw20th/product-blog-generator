import "dotenv/config";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const base64 = process.env.FIREBASE_CONFIG_BASE64;

if (!base64) {
  throw new Error("FIREBASE_CONFIG_BASE64 is not set in environment variables");
}

let serviceAccount: ServiceAccount;

try {
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  serviceAccount = JSON.parse(decoded);
} catch (err) {
  console.error("Failed to parse FIREBASE_CONFIG_BASE64:", err);
  throw err;
}

const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(firebaseApp);
