"use client";

import Image from "next/image";
import type { Customer } from "@/types/game";

type Props = {
  customer: Customer;
};

const moodEmoji: Record<string, string> = {
  落ち込み: "😢",
  しんみり: "🥀",
  焦りと諦め: "💦",
};

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="rounded-2xl border-4 border-wood-brown bg-card p-6 shadow-2xl animate-slide-in-left">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-wood-brown">
          <Image
            src={customer.icon}
            alt={customer.customerName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {customer.customerName}
          </h2>
          <p className="text-sm text-sub-text">
            気分：{customer.mood} {moodEmoji[customer.mood] ?? ""}
          </p>
          <p className="text-sm text-sub-text">
            難易度：{customer.difficulty}{" "}
            <span className="text-accent">
              {"★".repeat(
                customer.difficulty === "Easy"
                  ? 1
                  : customer.difficulty === "Normal"
                    ? 2
                    : 3,
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="mb-4 rounded-xl border-2 border-wood-brown bg-background/60 p-4">
        <p className="leading-relaxed text-foreground">
          「{customer.orderText}」
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {customer.constraints.map((c) => (
          <span
            key={c}
            className="rounded-md border border-amber-700 bg-amber-950/60 px-2 py-1 text-xs text-sub-text"
          >
            #{c}
          </span>
        ))}
      </div>
    </div>
  );
}
