import { describe, expect, it } from "vitest";
import { getExactMeldCombinations } from "../getExactMeldCombinations";
import { BAMS, CRAKS, DOTS, FLOWER_SUIT, WIND_SUIT } from "../../constants";
import type { MahjongHandMeld } from "../../types";

describe("getExactMeldCombinations", () => {
  it("should return an empty array if no melds are provided", () => {
    expect(getExactMeldCombinations([])).toEqual([]);
  });

  it("should not return duplicate combinations", () => {
    const melds = [{ numbers: ["1111"], suit: "G" as const }];
    const result = getExactMeldCombinations(melds);

    // There are 3 ways to assign a G (DOTS, CRAKS, or BAMS)
    expect(result).toHaveLength(3);
    const suits = result.map(combo => combo[0].suit).sort();
    expect(suits).toEqual([BAMS, CRAKS, DOTS].sort());
  });

  it("should assign FLOWER_SUIT to melds with only flowers", () => {
    const melds: MahjongHandMeld[] = [{ numbers: ["FFFF"], suit: FLOWER_SUIT }];
    const result = getExactMeldCombinations(melds);

    expect(result).toHaveLength(1);
    expect(result[0][0].suit).toBe(FLOWER_SUIT);
  });

  it("should assign WIND_SUIT to melds with only winds", () => {
    const melds: MahjongHandMeld[] = [{ numbers: ["NEWS"], suit: WIND_SUIT }];
    const result = getExactMeldCombinations(melds);

    expect(result).toHaveLength(1);
    expect(result[0][0].suit).toBe(WIND_SUIT);
  });

  it("should assign DOTS to melds with only zeros (Dot Dragons)", () => {
    const melds: MahjongHandMeld[] = [{ numbers: ["0000"], suit: DOTS }];
    const result = getExactMeldCombinations(melds);

    expect(result).toHaveLength(1);
    expect(result[0][0].suit).toBe(DOTS);
  });

  it("should handle multiple options without duplicates", () => {
    const melds = [
      { numbers: ["222", "555"], suit: "G" as const }
    ];
    const result = getExactMeldCombinations(melds);

    // 3 unique suits * 2 options = 6 results
    expect(result).toHaveLength(6);
  });
});
