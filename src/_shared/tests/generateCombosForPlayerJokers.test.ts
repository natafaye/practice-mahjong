import { describe, expect, it } from "vitest";
import { generateCombosForPlayerJokers } from "../getWinWithHandChance/generateCombosForPlayerJokers";
import type { NeededData } from "../getWinWithHandChance/getDrawingChance";

describe("generateCombosForPlayerJokers", () => {
  it("should return the original neededTiles if 0 jokers are available", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ];
    const playerJokerCount = 0;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(neededTiles);
  });

  it("should return the original neededTiles if no tiles are callable", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 1, callable: 0 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 1, callable: 0 }
    ];
    const playerJokerCount = 3;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(neededTiles);
  });

  it("should distribute 1 joker across multiple callable tiles", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 },
      { tileKey: "CRAKS_4", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ];
    const playerJokerCount = 1;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    // Possibilities:
    // 1. Used on DOTS_2
    // 2. Used on CRAKS_4
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: "CRAKS_4", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ]);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ]);
  });

  it("should distribute multiple jokers", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 },
      { tileKey: "CRAKS_4", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ];
    const playerJokerCount = 2;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    // Possibilities:
    // 1. 2 on DOTS_2, 0 on CRAKS_4
    // 2. 1 on DOTS_2, 1 on CRAKS_4
    // 3. 0 on DOTS_2, 2 on CRAKS_4
    expect(result).toHaveLength(3);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 0, nonCallable: 0, callable: 0 },
      { tileKey: "CRAKS_4", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ]);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ]);
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 0, callable: 2 },
      { tileKey: "CRAKS_4", totalNeeded: 0, nonCallable: 0, callable: 0 }
    ]);
  });

  it("should cap the jokers used by the total needed callable amount", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const playerJokerCount = 5;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([
      { tileKey: "DOTS_2", totalNeeded: 0, nonCallable: 0, callable: 0 }
    ]);
  });

  it("should correctly handle mixed callable and non-callable tiles", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 2, callable: 0 },
      { tileKey: "CRAKS_4", totalNeeded: 3, nonCallable: 0, callable: 3 }
    ];
    const playerJokerCount = 1;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([
      { tileKey: "DOTS_2", totalNeeded: 2, nonCallable: 2, callable: 0 },
      { tileKey: "CRAKS_4", totalNeeded: 2, nonCallable: 0, callable: 2 }
    ]);
  });

  it("should exclude tiles from the combo if their totalNeeded becomes 0", () => {
    const neededTiles: NeededData[] = [
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 },
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const playerJokerCount = 1;
    const result = generateCombosForPlayerJokers(neededTiles, playerJokerCount);
    
    // Possibilities (using 1 joker):
    // 1. Used on DOTS_2 (DOTS_2 becomes 0 totalNeeded, should be excluded) -> [{ tileKey: "CRAKS_4", totalNeeded: 1, ... }]
    // 2. Used on CRAKS_4 (CRAKS_4 becomes 0 totalNeeded, should be excluded) -> [{ tileKey: "DOTS_2", totalNeeded: 1, ... }]
    
    expect(result).toHaveLength(2);
    
    expect(result).toContainEqual([
      { tileKey: "CRAKS_4", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ]);
    
    expect(result).toContainEqual([
      { tileKey: "DOTS_2", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ]);

    // Crucially, none of the results should contain a tile with totalNeeded: 0
    result.forEach(combo => {
      combo.forEach(tile => {
        expect(tile.totalNeeded).not.toBe(0);
      });
    });
  });
});
