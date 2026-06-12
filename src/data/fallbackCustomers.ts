import type { Customer } from "@/types/game";

export const customerIcons = [
  "/images/customer-salaryman.png",
  "/images/customer-last-train.png",
  "/images/customer-heartbroken.png",
];

export const fallbackCustomers: Customer[] = [
  {
    customerName: "残業帰りの会社員",
    mood: "落ち込み",
    orderText:
      "今日は上司に怒られた。でも明日も早い。重すぎず、でも少し救われるやつをくれ。",
    constraints: ["胃に重すぎない", "明日に響きにくい", "少し元気が出る"],
    difficulty: "Easy",
    icon: customerIcons[0],
  },
  {
    customerName: "終電逃し男",
    mood: "焦りと諦め",
    orderText:
      "終電、行っちゃったんだよね……。もう始発まで腰を据えるしかない。長く付き合えるやつを頼む。",
    constraints: ["長居できる", "飲みすぎない", "財布に優しい"],
    difficulty: "Normal",
    icon: customerIcons[1],
  },
  {
    customerName: "恋に破れた女",
    mood: "しんみり",
    orderText:
      "今日で全部終わったの。慰めはいらないけど、ひとりで飲むには寂しい夜なのよね。",
    constraints: ["説教はNG", "甘すぎない", "静かに飲みたい"],
    difficulty: "Hard",
    icon: customerIcons[2],
  },
];

export const fallbackEvaluation = {
  score: 70,
  reaction: "まあ、こういう夜もあるか……。悪くないよ、うん。",
  comment:
    "通信の調子が悪く、マスターの勘で採点しました。選択の方向性は悪くありません。",
  goodPoints: ["客の話をちゃんと聞いた", "無難にまとめた"],
  improvement: "もう少し客の気分に踏み込んでもよかった。",
  title: "様子見の店主",
};
