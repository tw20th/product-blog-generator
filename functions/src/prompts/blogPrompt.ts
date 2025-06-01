// functions/src/prompts/blogPrompt.ts
import openai from "../utils/openaiClient";
import fs from "fs";
import path from "path";

function loadPromptTemplate(): string {
  const filePath = path.resolve(__dirname, "../../prompts/blogPromptTemplate.txt");
  return fs.readFileSync(filePath, "utf8");
}

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/{{(.*?)}}/g, (_, key) => values[key.trim()] || "");
}

export async function generateBlogContent({
  productName,
  price,
  features
}: {
  productName: string;
  price: string;
  features: string;
}): Promise<string> {
  const rawTemplate = loadPromptTemplate();
  const filledPrompt = fillTemplate(rawTemplate, { productName, price, features });

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: filledPrompt }]
  });

  const content = res.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI応答なし");
  return content;
}
