import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FB_PROJECT_ID;
const clientEmail = process.env.FB_CLIENT_EMAIL;
const privateKey = process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing Firebase environment variables.");
}

const firebaseApp = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey
  })
});

export const db = getFirestore(firebaseApp);
