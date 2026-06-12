"use client";

import { useState } from "react";
import type { GameResult } from "@/types/game";
import { averageScore, getRank } from "@/lib/rank";
import WoodButton from "./WoodButton";

type Props = {
  results: GameResult[];
  onRetry: () => void;
};

export default function FinalResult({ results, onRetry }: Props) {
  const [copied, setCopied] = useState(false);
  const average = averageScore(results.map((r) => r.evaluation.score));
  const { rank, title } = getRank(average);

  const shareText = `🏮 酔いどれ注文ミスゲーム 🏮
本日の営業結果
平均満足度：${average}%
ランク：${rank}
称号：${title}
#酔いどれ注文ミスゲーム`;

  const copyShare = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border-4 border-wood-brown bg-card p-8 shadow-2xl animate-fade-in-up">
      <h1 className="mb-6 text-center text-3xl font-bold text-accent">
        本日の営業結果
      </h1>
      <div className="mb-6 rounded-xl border-2 border-wood-brown bg-background/60 p-6 text-center">
        <p className="text-2xl text-foreground">平均満足度：{average}%</p>
        <p className="mt-2 text-4xl font-bold text-accent">ランク：{rank}</p>
        <p className="mt-2 text-xl text-foreground animate-pop-in">
          称号：{title}
        </p>
      </div>
      <section className="mb-8">
        <h2 className="mb-3 font-bold text-sub-text">接客履歴</h2>
        <ul className="flex flex-col gap-2">
          {results.map((r, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg border border-wood-brown bg-background/40 px-4 py-2 text-sm"
            >
              <span className="text-foreground">
                {i + 1}人目 {r.customer.customerName}
              </span>
              <span className="font-bold text-accent">
                {r.evaluation.score}%
              </span>
            </li>
          ))}
        </ul>
      </section>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <WoodButton label="もう一度開店" onClick={onRetry} />
        <WoodButton
          label={copied ? "コピーしました！" : "結果をX用にコピー"}
          onClick={copyShare}
          variant="secondary"
        />
      </div>
    </div>
  );
}
