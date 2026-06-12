import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  fallbackCustomers,
  customerIcons,
} from "@/data/fallbackCustomers";
import type { Customer } from "@/types/game";

const GENERATE_PROMPT = `あなたは居酒屋ゲームのシナリオ生成AIです。
ユーザーに提示する「クセのある客」を1人生成してください。

条件:
- 日本語で出力する
- 客は酒の席に来た人物
- 注文は少し曖昧で、人間味がある内容にする
- プレイヤーが酒・肴・一言トークを選びたくなる内容にする
- 不快すぎる表現、差別的表現、過度な性的表現は避ける
- 未成年飲酒を連想させる設定は避ける

出力形式は必ずJSONにしてください。

{
  "customerName": "客の名前",
  "mood": "気分",
  "orderText": "客の注文セリフ",
  "constraints": ["制約1", "制約2", "制約3"],
  "difficulty": "Easy / Normal / Hard"
}`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const round: number = typeof body.round === "number" ? body.round : 1;
  const difficulty: string = body.difficulty ?? "Normal";
  const icon = customerIcons[(round - 1) % customerIcons.length];
  const fallback = fallbackCustomers[(round - 1) % fallbackCustomers.length];

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallback);
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: GENERATE_PROMPT },
        {
          role: "user",
          content: `難易度: ${difficulty}。${round}人目の客を生成してください。毎回違う人物像にしてください。`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 1.0,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);
    const customer: Customer = {
      customerName: String(parsed.customerName ?? fallback.customerName),
      mood: String(parsed.mood ?? fallback.mood),
      orderText: String(parsed.orderText ?? fallback.orderText),
      constraints: Array.isArray(parsed.constraints)
        ? parsed.constraints.map(String)
        : fallback.constraints,
      difficulty: ["Easy", "Normal", "Hard"].includes(parsed.difficulty)
        ? parsed.difficulty
        : "Normal",
      icon,
    };
    return NextResponse.json(customer);
  } catch (error) {
    console.error("generate-customer failed:", error);
    return NextResponse.json(fallback);
  }
}
