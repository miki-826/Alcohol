import { createClient } from "@supabase/supabase-js";
import type { GameResult } from "@/types/game";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export async function saveGameResult(result: GameResult): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const { error } = await supabase.from("game_results").insert({
    customer_name: result.customer.customerName,
    mood: result.customer.mood,
    order_text: result.customer.orderText,
    drink: result.choice.drink,
    food: result.choice.food,
    talk: result.choice.talk,
    score: result.evaluation.score,
    reaction: result.evaluation.reaction,
    comment: result.evaluation.comment,
    title: result.evaluation.title,
  });
  if (error) {
    console.error("Supabase save failed:", error.message);
  }
}
