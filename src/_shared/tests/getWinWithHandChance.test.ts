import { describe, expect, it } from "vitest";
import { CARD_2025 } from "../../_data/CARD_2025";
import { createMeld, createTile, createFlower, createJoker } from "./testUtilities";
import { BAMS, CRAKS, DOTS, PLAYING } from "../../constants";
import type { MahjongGameData } from "../../types";
import { getWinWithHandChance } from "../getWinWithHandChance/getWinWithHandChance";

describe("getWinWithHandChance", () => {
  const allHands = CARD_2025.hands;

  const createBaseGameData = (playerTiles: any[]): MahjongGameData => ({
    currentPlayer: 0,
    players: [
      { index: 0, concealed: playerTiles, exposed: [] },
      { index: 1, concealed: [], exposed: [] },
      { index: 2, concealed: [], exposed: [] },
      { index: 3, concealed: [], exposed: [] },
    ],
    wall: new Array(100).fill({}), // 100 tiles left
    discard: [],
    melding: [],
    passing: [[], [], [], []],
    readyToPass: [false, false, false, false],
    gameState: PLAYING,
    cardName: "2025"
  });

  it("should return ~1.0 for a perfect hand", () => {
    const hand = allHands.find(h => h.section === "2468" && h.melds.length === 4)!;
    const tiles = [
      ...createMeld(DOTS, "222"),
      ...createMeld(DOTS, "4444"),
      ...createMeld(DOTS, "666"),
      ...createMeld(DOTS, "8888"),
    ];
    const gameData = createBaseGameData(tiles);

    const { chance } = getWinWithHandChance(hand, gameData, 0);
    expect(chance).toBeGreaterThan(0.9);
  });

  it("should return 0 for a concealed hand if player has exposed tiles", () => {
    const hand = allHands.find(h => h.concealed)!;
    const gameData = createBaseGameData([]);
    gameData.players[0].exposed = [createTile(DOTS, 1)];

    const { chance } = getWinWithHandChance(hand, gameData, 0);
    expect(chance).toBe(0);
  });

  it("should return 0 if a required tile is 'dead' (all are visible elsewhere)", () => {
    const hand = allHands.find(h => h.section === "2025" && h.melds[0].numbers[0] === "FFFF")!;
    const tiles = [
      ...createMeld(BAMS, "2025"),
      ...createMeld(CRAKS, "222"),
      ...createMeld(DOTS, "222"),
      createFlower(), // Missing 3 flowers
    ];
    const gameData = createBaseGameData(tiles);
    // All 7 other Flowers and all 8 jokers are dead
    gameData.discard = [
        ...new Array(7).fill(createFlower()),
        ...new Array(8).fill(createJoker())
    ];

    const { chance } = getWinWithHandChance(hand, gameData, 0);
    expect(chance).toBe(0);
  });

  it("should NOT return 0 if a required tile is 'dead' (all are visible elsewhere) but jokers are available", () => {
    const hand = allHands.find(h => h.section === "2025" && h.melds[0].numbers[0] === "FFFF")!;
    const tiles = [
      ...createMeld(BAMS, "2025"),
      ...createMeld(CRAKS, "222"),
      ...createMeld(DOTS, "222"),
      createFlower(), // Missing 3 flowers
    ];
    const gameData = createBaseGameData(tiles);
    // All 7 other Flowers are dead, but not the jokers
    gameData.discard = [
        ...new Array(7).fill(createFlower()),
    ];

    const { chance } = getWinWithHandChance(hand, gameData, 0);
    expect(chance).toBeGreaterThan(0);
  });

  it("should increase likelihood with more jokers", () => {
    const hand = allHands.find(h => h.section === "2468" && h.melds.length === 4)!;
    const tiles1 = [
      ...createMeld(DOTS, "222"),
      ...createMeld(DOTS, "4444"),
      ...createMeld(DOTS, "666"),
      ...createMeld(DOTS, "88"), // Missing two 8s
    ];
    const tiles2 = [...tiles1, createTile("JOKER")];

    const gameData1 = createBaseGameData(tiles1);
    const gameData2 = createBaseGameData(tiles2);

    const { chance: result1 } = getWinWithHandChance(hand, gameData1, 0);
    const { chance: result2 } = getWinWithHandChance(hand, gameData2, 0);

    expect(result2).toBeGreaterThan(result1);
  });

  it("should decrease likelihood as the wall gets smaller", () => {
    const hand = allHands.find(h => h.section === "2468" && h.melds.length === 4)!;
    const tiles = [
      ...createMeld(DOTS, "222"),
      ...createMeld(DOTS, "4444"),
      ...createMeld(DOTS, "666"),
      ...createMeld(DOTS, "88"), // Missing two 8s
    ];

    const gameDataBigWall = createBaseGameData(tiles);
    const gameDataSmallWall = createBaseGameData(tiles);
    gameDataSmallWall.wall = new Array(10).fill({});

    const { chance: result1 } = getWinWithHandChance(hand, gameDataBigWall, 0);
    const { chance: result2 } = getWinWithHandChance(hand, gameDataSmallWall, 0);

    expect(result1).toBeGreaterThan(result2);
  });
});
