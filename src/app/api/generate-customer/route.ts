import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  fallbackCustomers,
  customerIcons,
} from "@/data/fallbackCustomers";
import type { Customer } from "@/types/game";
import { drinks } from "@/data/drinks";
import { foods } from "@/data/foods";

const GENERATE_PROMPT = `あなたは居酒屋ゲームのシナリオ生成AIです。
ユーザーに提示する「クセのある客」を1人生成してください。

この店のメニューは以下です。
酒: ${drinks.join("、")}
肴: ${foods.join("、")}

条件:
- 日本語で出力する
- 客は酒の席に来た人物
- 注文は少し曖昧で、人間味がある内容にする
- 【重要】注文と制約は、上記メニューの中に「これが正解だろう」と思える酒と肴の組み合わせが必ず1つ以上ある内容にする
- 【重要】注文文・制約には、メニューにある料理名や酒の名前を直接入れない（「冷奴をくれ」「ビールが飲みたい」はNG）。気分・状況・温度感・食感・味の方向性（さっぱり、温かい、つまみやすい等）で間接的に表現し、プレイヤーが推理して当てる楽しさを作る
- メニューにない特定の銘柄・商品・味（例：苦みの強いクラフトビール、特定の地酒など）を名指ししたり、それを暗に要求する注文にはしない
- 季節の食べ物や魚（例：秋刀魚、牡蠣、鍋など）に言及する場合は、必ず現在の時期に合ったものだけにする。時期外れの旬の食材を求める注文にはしない
- プレイヤーが酒・肴・一言トークを選びたくなる内容にする

難易度ごとの作り分け（指定された難易度に必ず従うこと）:
- Easy: ヒントが素直で分かりやすい。「仕事終わりで喉がカラカラ」「揚げたてをガッツリ」のように、読めばほぼ1つの正解が浮かぶ
- Normal: ヒントをやや間接的にする。気分や状況から候補が2〜3個に絞れる程度。少し考える必要がある
- Hard: 遠回しでとんち・なぞなぞ風。一見何が欲しいのか分からないが、状況・気分・制約を組み合わせてよく考えると筋道立てて正解にたどり着ける（例:「白くて四角くて、夏の夕方みたいなやつ」→冷奴）。理不尽な無理問題にはせず、「考えたら分かった！」と思える面白さにする
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
    const month = new Date().getMonth() + 1;
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: GENERATE_PROMPT },
        {
          role: "user",
          content: `現在は${month}月です。難易度: ${difficulty}。${round}人目の客を生成してください。毎回違う人物像にしてください。`,
        },
      ],
      response_format: { type: "json_object" },
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
      difficulty: ["Easy", "Normal", "Hard"].includes(difficulty)
        ? (difficulty as Customer["difficulty"])
        : "Normal",
      icon,
    };
    return NextResponse.json(customer);
  } catch (error) {
    console.error("generate-customer failed:", error);
    return NextResponse.json(fallback);
  }
}
