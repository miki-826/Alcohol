import { NextResponse } from "next/server";
import OpenAI from "openai";
import { fallbackEvaluation } from "@/data/fallbackCustomers";
import type { Evaluation } from "@/types/game";

const EVALUATE_PROMPT = `あなたは居酒屋接客ゲームの採点AIです。
以下のAI客に対して、プレイヤーが選んだ酒・肴・一言トークを採点してください。

採点手順:
まず点数を出す前に、客の気分・注文・制約と、選ばれた酒・肴・一言トークの相性を1つずつ丁寧に考えること。
- この酒は客の気分・状況・制約に合うか
- この肴は客の気分・状況・制約に合うか
- 酒と肴の組み合わせ自体は自然か（例：日本酒×塩辛は好相性、梅酒×キムチはちぐはぐ）
- 一言トークは客の感情に寄り添えているか

採点配点（合計100点）:
- 酒の相性: 30点（気分・状況・制約に合っているか）
- 肴の相性: 30点（気分・状況・制約に合っているか、酒との組み合わせが自然か）
- 制約の遵守: 20点（制約に1つでも明確に反していたらこの項目は大きく減点）
- 一言トーク: 20点（空気を読めているか、押し付けがましくないか）

採点の目安:
- 90点以上: 酒・肴・一言すべてが気分と制約にぴったり噛み合っている場合のみ
- 70〜89点: おおむね合っているが、どれか1つが惜しい
- 50〜69点: 方向性は分かるが、相性や制約の見落としがある
- 50点未満: 制約に明確に反している、または気分と正反対の選択

注意:
- 採点は0〜100点
- 点数はメリハリをつける（無難な選択を常に70点台にしない。噛み合えば高く、外れていればはっきり低く）
- コメントには「なぜその点数なのか」相性の理由を具体的に書く
- コメントは少しユーモアを入れる
- ただしプレイヤーを強く否定しすぎない
- 未成年飲酒、危険飲酒、飲酒強要を肯定しない
- 飲み過ぎをすすめない
- 明日早い・体調が悪い客には軽め/ノンアルも高評価にする

出力形式は必ずJSONにしてください。

{
  "score": 0,
  "reaction": "客の反応セリフ",
  "comment": "評価コメント",
  "goodPoints": ["良かった点1", "良かった点2"],
  "improvement": "改善点",
  "title": "称号"
}`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.customer || !body?.choice) {
    return NextResponse.json(
      { error: "customer and choice are required" },
      { status: 400 },
    );
  }

  const { customer, choice } = body;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallbackEvaluation);
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: EVALUATE_PROMPT },
        {
          role: "user",
          content: `入力:
客名: ${customer.customerName}
気分: ${customer.mood}
注文: ${customer.orderText}
制約: ${(customer.constraints ?? []).join(" / ")}

プレイヤーの選択:
酒: ${choice.drink}
肴: ${choice.food}
一言トーク: ${choice.talk}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);
    const evaluation: Evaluation = {
      score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
      reaction: String(parsed.reaction ?? fallbackEvaluation.reaction),
      comment: String(parsed.comment ?? fallbackEvaluation.comment),
      goodPoints: Array.isArray(parsed.goodPoints)
        ? parsed.goodPoints.map(String)
        : fallbackEvaluation.goodPoints,
      improvement: String(parsed.improvement ?? fallbackEvaluation.improvement),
      title: String(parsed.title ?? fallbackEvaluation.title),
    };
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("evaluate-order failed:", error);
    return NextResponse.json(fallbackEvaluation);
  }
}
