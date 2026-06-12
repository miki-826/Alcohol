"use client";

import Image from "next/image";

type Props = {
  onStart: () => void;
  onShowRules: () => void;
};

export default function TitleScreen({ onStart, onShowRules }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative aspect-video w-full max-w-[177.78vh] animate-fade-in-up">
        <Image
          src="/images/title.png"
          alt="酔いどれ注文ミスゲーム"
          fill
          priority
          className="object-contain"
        />
        <button
          type="button"
          onClick={onStart}
          aria-label="開店する"
          className="absolute left-[31%] top-[51.5%] h-[14.5%] w-[38%] cursor-pointer rounded-lg transition-all hover:ring-4 hover:ring-accent/80 hover:brightness-110"
        />
        <button
          type="button"
          onClick={onShowRules}
          aria-label="遊び方を見る"
          className="absolute left-[31%] top-[69%] h-[15%] w-[38%] cursor-pointer rounded-lg transition-all hover:ring-4 hover:ring-accent/80 hover:brightness-110"
        />
      </div>
    </div>
  );
}
