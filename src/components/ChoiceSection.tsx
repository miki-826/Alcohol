"use client";

import { useState } from "react";
import { drinks } from "@/data/drinks";
import { foods } from "@/data/foods";
import { talks } from "@/data/talks";
import type { PlayerChoice } from "@/types/game";
import ChoiceButton from "./ChoiceButton";
import WoodButton from "./WoodButton";

type Props = {
  onSubmit: (choice: PlayerChoice) => void;
};

export default function ChoiceSection({ onSubmit }: Props) {
  const [drink, setDrink] = useState<string | null>(null);
  const [food, setFood] = useState<string | null>(null);
  const [talk, setTalk] = useState<string | null>(null);
  const [freeDrink, setFreeDrink] = useState("");
  const [freeFood, setFreeFood] = useState("");
  const [freeTalk, setFreeTalk] = useState("");

  const selectedDrink = freeDrink.trim() !== "" ? freeDrink.trim() : drink;
  const selectedFood = freeFood.trim() !== "" ? freeFood.trim() : food;
  const selectedTalk = freeTalk.trim() !== "" ? freeTalk.trim() : talk;
  const canSubmit =
    selectedDrink !== null && selectedFood !== null && selectedTalk !== null;

  const inputClass =
    "mt-2 w-full rounded-xl border-2 border-wood-brown bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-sub-text/60 focus:border-accent focus:outline-none";

  return (
    <div className="flex flex-col gap-6 rounded-2xl border-4 border-wood-brown bg-card p-6 shadow-2xl animate-fade-in-up">
      <section>
        <h3 className="mb-3 text-lg font-bold text-accent">1. 酒を選ぶ 🍺</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {drinks.map((d) => (
            <ChoiceButton
              key={d}
              label={d}
              selected={drink === d && freeDrink.trim() === ""}
              onClick={() => {
                setDrink(d);
                setFreeDrink("");
              }}
            />
          ))}
        </div>
        <input
          type="text"
          value={freeDrink}
          onChange={(e) => setFreeDrink(e.target.value)}
          placeholder="自由入力：好きな酒の名前を書く"
          maxLength={30}
          className={inputClass}
        />
      </section>
      <section>
        <h3 className="mb-3 text-lg font-bold text-accent">2. 肴を選ぶ 🍢</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {foods.map((f) => (
            <ChoiceButton
              key={f}
              label={f}
              selected={food === f && freeFood.trim() === ""}
              onClick={() => {
                setFood(f);
                setFreeFood("");
              }}
            />
          ))}
        </div>
        <input
          type="text"
          value={freeFood}
          onChange={(e) => setFreeFood(e.target.value)}
          placeholder="自由入力：好きな料理名を書く"
          maxLength={30}
          className={inputClass}
        />
      </section>
      <section>
        <h3 className="mb-3 text-lg font-bold text-accent">
          3. 一言トークを選ぶ 💬
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {talks.map((t) => (
            <ChoiceButton
              key={t}
              label={t}
              selected={talk === t && freeTalk.trim() === ""}
              onClick={() => {
                setTalk(t);
                setFreeTalk("");
              }}
            />
          ))}
        </div>
        <input
          type="text"
          value={freeTalk}
          onChange={(e) => setFreeTalk(e.target.value)}
          placeholder="自由入力：自分の一言を書く"
          maxLength={50}
          className={inputClass}
        />
      </section>
      <div className="flex justify-end">
        <WoodButton
          label="この注文で出す"
          onClick={() =>
            onSubmit({
              drink: selectedDrink!,
              food: selectedFood!,
              talk: selectedTalk!,
            })
          }
          disabled={!canSubmit}
        />
      </div>
    </div>
  );
}
