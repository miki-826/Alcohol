"use client";

import { useEffect, useState } from "react";
import type { Evaluation } from "@/types/game";
import WoodButton from "./WoodButton";

type Props = {
  evaluation: Evaluation;
  isLast: boolean;
  onNext: () => void;
};

export default function ResultCard({ evaluation, isLast, onNext }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayScore(Math.round(evaluation.score * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [evaluation.score]);

  const stars = Math.max(1, Math.round(evaluation.score / 20));

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border-4 border-wood-brown bg-card p-8 shadow-2xl animate-fade-in-up">
      <p className="text-center text-4xl font-bold text-accent">
        満足度 {displayScore}%
      </p>
      <p className="mt-2 text-center text-2xl text-accent">
        {"★".repeat(stars)}
        <span className="text-wood-brown">{"★".repeat(5 - stars)}</span>
      </p>
      <div className="my-6 border-t-2 border-wood-brown/50" />
      <section className="mb-4">
        <h3 className="mb-2 font-bold text-sub-text">客の反応</h3>
        <div className="rounded-xl border-2 border-wood-brown bg-background/60 p-4">
          <p className="text-foreground">「{evaluation.reaction}」</p>
        </div>
      </section>
      <section className="mb-4">
        <h3 className="mb-2 font-bold text-sub-text">評価コメント</h3>
        <p className="text-sm leading-relaxed text-foreground">
          {evaluation.comment}
        </p>
      </section>
      <section className="mb-4">
        <h3 className="mb-2 font-bold text-sub-text">良かった点</h3>
        <ul className="list-inside list-disc text-sm text-foreground">
          {evaluation.goodPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="mb-2 font-bold text-sub-text">改善点</h3>
        <p className="text-sm text-foreground">{evaluation.improvement}</p>
      </section>
      <div className="mb-6 rounded-xl border-2 border-accent bg-main-red/40 p-4 text-center animate-pop-in">
        <p className="text-xs text-sub-text">獲得称号</p>
        <p className="text-xl font-bold text-accent">{evaluation.title}</p>
      </div>
      <div className="flex justify-center">
        <WoodButton
          label={isLast ? "本日の売上を見る" : "次の客へ"}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
