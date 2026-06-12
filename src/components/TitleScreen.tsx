"use client";

import Image from "next/image";
import WoodButton from "./WoodButton";

type Props = {
  onStart: () => void;
  onShowRules: () => void;
};

export default function TitleScreen({ onStart, onShowRules }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/title.png"
        alt="酔いどれ注文ミスゲーム"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 pt-[40vh] animate-fade-in-up">
        <div className="flex flex-col gap-4 w-72">
          <WoodButton label="開店する" onClick={onStart} />
          <WoodButton label="遊び方を見る" onClick={onShowRules} variant="secondary" />
        </div>
        <p className="text-center text-sm text-foreground/90 drop-shadow-md">
          AI客のムチャぶり注文に、酒と肴と一言で応えろ。
        </p>
      </div>
    </div>
  );
}
