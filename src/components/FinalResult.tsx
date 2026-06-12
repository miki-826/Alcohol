"use client";

import { useState } from "react";
import type { GameResult } from "@/types/game";
import { averageScore, getRank } from "@/lib/rank";
import WoodButton from "./WoodButton";

type Props = {
  results: GameResult[];
  onRetry: () => void;
  onBackToTitle: () => void;
};

const prosperity: Record<string, { label: string; comment: string; emoji: string }> = {
  S: {
    label: "超繁盛！行列のできる店",
    comment: "噂が噂を呼び、のれんの外まで行列が……。今夜は伝説になった。",
    emoji: "🏮🏮🏮🏮🏮",
  },
  A: {
    label: "大繁盛！常連が増えた",
    comment: "「また来るよ」の声が続出。レジの音が心地よい夜だった。",
    emoji: "🏮🏮🏮🏮",
  },
  B: {
    label: "まずまずの賑わい",
    comment: "悪くない夜だった。カウンターには笑い声がそこそこ響いた。",
    emoji: "🏮🏮🏮",
  },
  C: {
    label: "ちょっと静かな夜",
    comment: "客足はいまひとつ。明日はもう少し空気を読んでいこう。",
    emoji: "🏮🏮",
  },
  D: {
    label: "閑古鳥が鳴いている……",
    comment: "客は首をかしげて帰っていった。出直しましょう。",
    emoji: "🏮",
  },
};

export default function FinalResult({ results, onRetry, onBackToTitle }: Props) {
  const [copied, setCopied] = useState(false);
  const average = averageScore(results.map((r) => r.evaluation.score));
  const { rank, title } = getRank(average);
  const totalScore = results.reduce((sum, r) => sum + r.evaluation.score, 0);
  const sales = totalScore * 50;
  const p = prosperity[rank];

  const shareText = `🏮 酔いどれ注文ミスゲーム 🏮
本日の繁盛結果
平均満足度：${average}%
本日の売上：${sales.toLocaleString()}円
ランク：${rank}
称号：${title}
${p.label}
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
        本日の繁盛結果
      </h1>
      <div className="mb-6 rounded-xl border-2 border-accent bg-main-red/30 p-6 text-center animate-pop-in">
        <p className="text-2xl">{p.emoji}</p>
        <p className="mt-2 text-2xl font-bold text-accent">{p.label}</p>
        <p className="mt-2 text-sm text-sub-text">{p.comment}</p>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-wood-brown bg-background/60 p-4 text-center">
          <p className="text-xs text-sub-text">来客数</p>
          <p className="text-2xl font-bold text-foreground">{results.length}人</p>
        </div>
        <div className="rounded-xl border-2 border-wood-brown bg-background/60 p-4 text-center">
          <p className="text-xs text-sub-text">本日の売上</p>
          <p className="text-2xl font-bold text-foreground">
            {sales.toLocaleString()}円
          </p>
        </div>
        <div className="rounded-xl border-2 border-wood-brown bg-background/60 p-4 text-center">
          <p className="text-xs text-sub-text">平均満足度</p>
          <p className="text-2xl font-bold text-foreground">{average}%</p>
        </div>
      </div>
      <div className="mb-6 rounded-xl border-2 border-wood-brown bg-background/60 p-6 text-center">
        <p className="text-4xl font-bold text-accent">ランク：{rank}</p>
        <p className="mt-2 text-xl text-foreground">称号：{title}</p>
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
      <div className="mt-4 flex justify-center">
        <WoodButton
          label="🏮 タイトルに戻る"
          onClick={onBackToTitle}
          variant="secondary"
        />
      </div>
    </div>
  );
}
