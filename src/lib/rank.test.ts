import { describe, it, expect } from "vitest";
import { averageScore, getRank } from "./rank";

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
