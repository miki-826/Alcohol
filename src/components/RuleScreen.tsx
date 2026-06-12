"use client";

import Image from "next/image";
import WoodButton from "./WoodButton";

type Props = {
  onStart: () => void;
  onBack: () => void;
};

const steps = [
  { icon: "🗣️", title: "AI客の注文を読む", text: "クセの強い客の曖昧な注文をよく読もう。" },
  { icon: "🍺", title: "酒を選ぶ", text: "客の気分や状況に合う一杯を選ぼう。" },
  { icon: "🍢", title: "肴を選ぶ", text: "重すぎず、満足感のある一皿を見極めよう。" },
  { icon: "💬", title: "一言トークを選ぶ", text: "空気を読んだ一言で客の心をつかもう。" },
  { icon: "⭐", title: "AIが満足度を採点", text: "相性と空気読みをAIが0〜100点で評価する。" },
];

export default function RuleScreen({ onStart, onBack }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <Image
        src="/images/bg-izakaya.png"
        alt=""
        fill
        className="object-cover opacity-60"
      />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border-4 border-wood-brown bg-card/95 p-8 shadow-2xl animate-fade-in-up">
        <h1 className="mb-2 text-center text-3xl font-bold text-accent">遊び方</h1>
        <p className="mb-6 text-center text-sm text-sub-text">
          ここはAI居酒屋。今日もクセの強い客がやってくる。
        </p>
        <ol className="mb-8 flex flex-col gap-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="text-2xl">{step.icon}</span>
              <div>
                <p className="font-bold text-foreground">
                  {i + 1}. {step.title}
                </p>
                <p className="text-sm text-sub-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mb-6 text-center text-xs text-sub-text">
          客の気分に合えば満足度アップ。外すと気まずい空気になる。
        </p>
        <div className="flex justify-center gap-4">
          <WoodButton label="開店する" onClick={onStart} />
          <WoodButton label="のれんをくぐり直す" onClick={onBack} variant="secondary" />
        </div>
      </div>
    </div>
  );
}
