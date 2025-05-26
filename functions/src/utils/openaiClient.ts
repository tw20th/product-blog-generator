// functions/src/utils/openaiClient.ts

import * as dotenv from "dotenv";
dotenv.config(); // ← ✅ これを追加

import { config } from "firebase-functions";
import { OpenAI } from "openai";

const apiKey = config()?.openai?.api_key ?? process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OpenAI APIキーが未設定です");
}

const openai = new OpenAI({ apiKey });
export default openai;
