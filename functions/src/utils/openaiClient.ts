import OpenAI from "openai";
import { config } from "firebase-functions";

const openai = new OpenAI({
  apiKey: config().openai.api_key
});

export default openai;
