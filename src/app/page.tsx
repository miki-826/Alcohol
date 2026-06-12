"use client";

import { useState } from "react";
import Image from "next/image";
import type {
  Customer,
  Evaluation,
  GameResult,
  PlayerChoice,
  Screen,
} from "@/types/game";
import {
  fallbackCustomers,
  fallbackEvaluation,
} from "@/data/fallbackCustomers";
import { saveGameResult } from "@/lib/supabase";
import TitleScreen from "@/components/TitleScreen";
import RuleScreen from "@/components/RuleScreen";
import CustomerCard from "@/components/CustomerCard";
import ChoiceSection from "@/components/ChoiceSection";
import LoadingScreen from "@/components/LoadingScreen";
import ResultCard from "@/components/ResultCard";
import FinalResult from "@/components/FinalResult";
import BgmPlayer from "@/components/BgmPlayer";

const TOTAL_CUSTOMERS = 3;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("title");
  const [round, setRound] = useState(1);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [results, setResults] = useState<GameResult[]>([]);
  const [loadingCustomer, setLoadingCustomer] = useState(false);

  const roundDifficulty = ["Easy", "Normal", "Hard"];

  const fetchCustomer = async (nextRound: number) => {
    setLoadingCustomer(true);
    setScreen("serving");
    try {
      const res = await fetch("/api/generate-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          round: nextRound,
          difficulty: roundDifficulty[(nextRound - 1) % roundDifficulty.length],
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setCustomer(await res.json());
    } catch {
      setCustomer(fallbackCustomers[(nextRound - 1) % fallbackCustomers.length]);
    } finally {
      setLoadingCustomer(false);
    }
  };

  const startGame = () => {
    setResults([]);
    setRound(1);
    setEvaluation(null);
    fetchCustomer(1);
  };

  const submitChoice = async (choice: PlayerChoice) => {
    if (!customer) return;
    setScreen("evaluating");
    let evaluated: Evaluation;
    try {
      const res = await fetch("/api/evaluate-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, choice }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      evaluated = await res.json();
    } catch {
      evaluated = fallbackEvaluation;
    }
    const result: GameResult = { customer, choice, evaluation: evaluated };
    setResults((prev) => [...prev, result]);
    setEvaluation(evaluated);
    setScreen("result");
    saveGameResult(result).catch(() => {});
  };

  const nextCustomer = () => {
    if (round >= TOTAL_CUSTOMERS) {
      setScreen("final");
      return;
    }
    const nextRound = round + 1;
    setRound(nextRound);
    setEvaluation(null);
    fetchCustomer(nextRound);
  };

  return (
    <main className="relative min-h-screen">
      {screen !== "title" && (
        <div className="pointer-events-none fixed inset-0 -z-10">
          <Image
            src="/images/bg-izakaya.png"
            alt=""
            fill
            className="object-cover opacity-50"
          />
        </div>
      )}

      {screen === "title" && (
        <TitleScreen
          onStart={startGame}
          onShowRules={() => setScreen("rules")}
        />
      )}

      {screen === "rules" && (
        <RuleScreen onStart={startGame} onBack={() => setScreen("title")} />
      )}

      {screen === "serving" &&
        (loadingCustomer || !customer ? (
          <LoadingScreen
            message="客が来店中……"
            subMessage="ガラッ……"
          />
        ) : (
          <div className="mx-auto max-w-5xl p-4 pb-44 sm:p-8 sm:pb-44">
            <header className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-bold text-accent">
                🏮 酔いどれ注文ミスゲーム
              </h1>
              <p className="text-sm text-sub-text">
                {round}人目 / {TOTAL_CUSTOMERS}人中
              </p>
            </header>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CustomerCard customer={customer} />
              <ChoiceSection key={round} onSubmit={submitChoice} />
            </div>
          </div>
        ))}

      {screen === "evaluating" && (
        <LoadingScreen
          message="マスターが考え中……"
          subMessage="酒と肴と一言の相性をAIが判定しています"
        />
      )}

      {screen === "result" && evaluation && (
        <div className="flex min-h-screen items-center p-4 pb-44 sm:p-8 sm:pb-44">
          <ResultCard
            evaluation={evaluation}
            isLast={round >= TOTAL_CUSTOMERS}
            onNext={nextCustomer}
          />
        </div>
      )}

      {screen === "final" && (
        <div className="flex min-h-screen items-center p-4 pb-44 sm:p-8 sm:pb-44">
          <FinalResult
            results={results}
            onRetry={startGame}
            onBackToTitle={() => setScreen("title")}
          />
        </div>
      )}

      <BgmPlayer />
    </main>
  );
}
