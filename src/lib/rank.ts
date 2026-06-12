export type Rank = {
  rank: "S" | "A" | "B" | "C" | "D";
  title: string;
};

export function averageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
}

const salesBands = [
  { lo: 90, hi: 100, salesLo: 150000, salesHi: 200000 },
  { lo: 80, hi: 89, salesLo: 90000, salesHi: 140000 },
  { lo: 70, hi: 79, salesLo: 50000, salesHi: 80000 },
  { lo: 60, hi: 69, salesLo: 25000, salesHi: 45000 },
  { lo: 0, hi: 59, salesLo: 3000, salesHi: 20000 },
];

export function calculateSales(average: number): number {
  const band =
    salesBands.find((b) => average >= b.lo && average <= b.hi) ??
    salesBands[salesBands.length - 1];
  const ratio = band.hi === band.lo ? 1 : (average - band.lo) / (band.hi - band.lo);
  const sales = band.salesLo + ratio * (band.salesHi - band.salesLo);
  return Math.round(sales / 100) * 100;
}

export function getRank(average: number): Rank {
  if (average >= 90) return { rank: "S", title: "伝説の居酒屋マスター" };
  if (average >= 80) return { rank: "A", title: "常連を生む名店主" };
  if (average >= 70) return { rank: "B", title: "いい感じの店員" };
  if (average >= 60) return { rank: "C", title: "まだ新人バイト" };
  return { rank: "D", title: "注文ミス常習犯" };
}
