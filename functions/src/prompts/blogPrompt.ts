import OpenAI from "openai";

export async function generateBlogContent(topic: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
以下のテーマで親向けのSEOブログ記事を生成してください。

---
テーマ: ${topic}
構成: タイトル、導入文、本文（見出し・箇条書き含む）
トーン: 信頼性と親しみ
制約: 文字数800字以上、日本語で出力
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });

  const content = res.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI応答なし");
  return content;
}
