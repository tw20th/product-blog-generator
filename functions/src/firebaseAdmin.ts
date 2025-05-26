import * as dotenv from "dotenv";
dotenv.config();

import { config } from "firebase-functions";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// .env または firebase functions:config の両対応
const base64 = process.env.ADMIN_SERVICE_ACCOUNT_BASE64 || config().admin?.config_base64;

if (!base64) {
  throw new Error("Service account base64 is not set.");
}

const decoded = Buffer.from(base64, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded) as ServiceAccount;

const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(firebaseApp);
