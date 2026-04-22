import { describe, expect, it } from "vitest";
import { generateCombosForDrawingJokers } from "../getWinWithHandChance/generateCombosForDrawingJokers";
import type { NeededData } from "../getWinWithHandChance/getDrawingChance";
import { JOKER_SUIT } from "../../constants";

describe("generateCombosForDrawingJokers", () => {
  it("should return the original neededTiles if 0 unseen jokers are available", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ];
    const unseenJokerCount = 0;
    const result = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(neededTiles);
  });

  it("should include combinations for 0 up to unseenJokerCount jokers", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ];
    const unseenJokerCount = 1;
    const result = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
    
    // Possibilities:
    // 0 jokers: [{ tileKey: "DOTS_2", totalNeeded: 2, ... }]
    // 1 joker:  [{ tileKey: "DOTS_2", totalNeeded: 1, ... }, { tileKey: "JOKER_", totalNeeded: 1, ... }]
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(neededTiles);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: JOKER_SUIT + "_", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ]);
  });

  it("should include all possible distributions for multiple jokers", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenJokerCount = 2;
    const result = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
    
    // Possibilities:
    // 0 jokers: (0,0) -> 1 combo
    // 1 joker:  (1,0), (0,1) -> 2 combos (each with JOKER_ x1)
    // 2 jokers: (1,1) -> 1 combo (with JOKER_ x2)
    
    expect(result).toHaveLength(4);
    
    // 0 jokers
    expect(result).toContainEqual(neededTiles);
    
    // 1 joker (used on DOTS_2)
    expect(result).toContainEqual([
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: JOKER_SUIT + "_", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ]);
    
    // 1 joker (used on CRAKS_4)
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: JOKER_SUIT + "_", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ]);
    
    // 2 jokers (used on both)
    expect(result).toContainEqual([
      { tileKey: JOKER_SUIT + "_", totalNeeded: 2, nonCallable: 2, callable: 0 }
    ]);
  });

  it("should cap the loop by total callable tiles to avoid duplicates", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenJokerCount = 5;
    const result = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
    
    // totalCallable = 1.
    // Loop should only do i=0 and i=1.
    // Result should be 2 combos.
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(neededTiles);
    expect(result).toContainEqual([
      { tileKey: JOKER_SUIT + "_", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ]);
  });
});
