export type Rank = {
  rank: "S" | "A" | "B" | "C" | "D";
  title: string;
};

export function averageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
}

export function getRank(average: number): Rank {
  if (average >= 90) return { rank: "S", title: "伝説の居酒屋マスター" };
  if (average >= 80) return { rank: "A", title: "常連を生む名店主" };
  if (average >= 70) return { rank: "B", title: "いい感じの店員" };
  if (average >= 60) return { rank: "C", title: "まだ新人バイト" };
  return { rank: "D", title: "注文ミス常習犯" };
}
