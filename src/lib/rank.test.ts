import { describe, it, expect } from "vitest";
import { averageScore, calculateSales, getRank } from "./rank";

describe("averageScore", () => {
  it("3人分のスコアの平均を四捨五入で返す", () => {
    expect(averageScore([92, 78, 88])).toBe(86);
  });

  it("空配列は0を返す", () => {
    expect(averageScore([])).toBe(0);
  });

  it("小数は四捨五入される", () => {
    expect(averageScore([80, 81])).toBe(81);
  });
});

describe("calculateSales", () => {
  it("満点なら大繁盛の20万円", () => {
    expect(calculateSales(100)).toBe(200000);
  });

  it("Sランク帯（90〜100）は15万〜20万円", () => {
    expect(calculateSales(90)).toBe(150000);
    expect(calculateSales(95)).toBe(175000);
  });

  it("Aランク帯（80〜89）は9万〜14万円", () => {
    expect(calculateSales(80)).toBe(90000);
    expect(calculateSales(89)).toBe(140000);
  });

  it("Bランク帯（70〜79）は5万〜8万円", () => {
    expect(calculateSales(70)).toBe(50000);
    expect(calculateSales(79)).toBe(80000);
  });

  it("Cランク帯（60〜69）は2.5万〜4.5万円", () => {
    expect(calculateSales(60)).toBe(25000);
    expect(calculateSales(69)).toBe(45000);
  });

  it("Dランク帯（0〜59）は3千〜2万円", () => {
    expect(calculateSales(0)).toBe(3000);
    expect(calculateSales(59)).toBe(20000);
  });

  it("帯の途中は100円単位で補間される", () => {
    expect(calculateSales(85)).toBe(117800);
  });
});

describe("getRank", () => {
  it("90〜100はSランク・伝説の居酒屋マスター", () => {
    expect(getRank(90)).toEqual({ rank: "S", title: "伝説の居酒屋マスター" });
    expect(getRank(100)).toEqual({ rank: "S", title: "伝説の居酒屋マスター" });
  });

  it("80〜89はAランク・常連を生む名店主", () => {
    expect(getRank(80)).toEqual({ rank: "A", title: "常連を生む名店主" });
    expect(getRank(89)).toEqual({ rank: "A", title: "常連を生む名店主" });
  });

  it("70〜79はBランク・いい感じの店員", () => {
    expect(getRank(70)).toEqual({ rank: "B", title: "いい感じの店員" });
    expect(getRank(79)).toEqual({ rank: "B", title: "いい感じの店員" });
  });

  it("60〜69はCランク・まだ新人バイト", () => {
    expect(getRank(60)).toEqual({ rank: "C", title: "まだ新人バイト" });
    expect(getRank(69)).toEqual({ rank: "C", title: "まだ新人バイト" });
  });

  it("0〜59はDランク・注文ミス常習犯", () => {
    expect(getRank(0)).toEqual({ rank: "D", title: "注文ミス常習犯" });
    expect(getRank(59)).toEqual({ rank: "D", title: "注文ミス常習犯" });
  });
});
