"use client";

type Props = {
  message: string;
  subMessage?: string;
};

export default function LoadingScreen({ message, subMessage }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <span className="text-6xl animate-lantern-sway">🏮</span>
      <p className="text-2xl font-bold text-foreground">{message}</p>
      {subMessage && <p className="text-sm text-sub-text">{subMessage}</p>}
      <p className="text-xs text-sub-text/70">少々お待ちください</p>
    </div>
  );
}
