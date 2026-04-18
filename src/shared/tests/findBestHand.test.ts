import { describe, expect, it } from "vitest";
import { findBestHand } from "../findBestHand";
import { CARD_2025 } from "../../useMahjongData/CARDS/CARD_2025";
import { createMeld, createTile } from "./testUtilities";
import { BAMS, CRAKS, DOTS, EXPOSED_GAP } from "../../constants";
import type { MahjongPlayer } from "../../types";

describe("findBestHand", () => {
  const allHands = CARD_2025.hands;

  it("should find a perfect match and return it immediately", () => {
    // FFFF (B), 2025 (G), 222 (R), 555 (R) - Any 3 Suits, Like Pungs 2s or 5s in Opp. Suits
    const tiles = [
      ...createMeld(CRAKS, "FFFF"),
      ...createMeld(DOTS, "2025"),
      ...createMeld(BAMS, "222"),
      ...createMeld(CRAKS, "222"),
    ];
    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.matches).toBe(14);
    expect(result.hand.section).toBe("2025");
    expect(result.hand.text).toBe("Any 3 Suits, Like Pungs 2s or 5s in Opp. Suits");
  });

  it("should find the hand with the most matches", () => {
    // 222, 4444, 666, 8888 in 1 suit
    const tiles = [
      ...createMeld(DOTS, "222"),
      ...createMeld(DOTS, "4444"),
      ...createMeld(DOTS, "666"),
      ...createMeld(DOTS, "88"), // Missing two 8s
    ];
    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.matches).toBe(12);
    expect(result.hand.section).toBe("2468");
  });

  it("should use hand value as a tiebreaker for equal matches", () => {
    // 2025 (G), 222 (R), 555 (R), DDDD (B) - Value 30
    const hand1 = allHands.find((h) => h.value === 30 && h.section === "2025")!;
    // 222 (G), 0000 (B), 222 (R), 5555 (R) - Value 25
    const hand2 = allHands.find((h) => h.value === 25 && h.section === "2025")!;

    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "777"), // Matches neither
        ...createMeld(BAMS, "222"), // Matches both
        ...createMeld(BAMS, "555"), // Matches both
        ...createMeld(DOTS, "0000"), // Matches both
      ],
      exposed: [],
    };

    const result = findBestHand(player, [hand1, hand2]);
    expect(result.hand.value).toBe(30);
  });

  it("should handle exposed tiles correctly", () => {
    // Hand: 222 (B), 4444 (B), 666 (B), 8888 (B)
    const hand = allHands.find((h) => h.section === "2468" && h.melds.length === 4)!;

    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "666"),
        ...createMeld(DOTS, "8888"),
      ],
      exposed: [...createMeld(DOTS, "4444"), EXPOSED_GAP],
    };

    const result = findBestHand(player, [hand]);
    expect(result.matches).toBe(14);
  });

  it("should find the best match across different sections", () => {
    // 11, 333, 5555, 777, 99 in 1 suit
    const hand13579 = allHands.find(
      (h) => h.section === "13579" && h.melds.length === 5,
    )!;
    // 333 (G), 6666 (G), 666 (R), 9999 (R)
    const hand369 = allHands.find((h) => h.section === "369")!;

    // Tiles that are mostly 13579
    const tiles = [
      ...createMeld(DOTS, "11"),
      ...createMeld(DOTS, "333"),
      ...createMeld(DOTS, "555"), // Missing one 5
    ];

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, [hand13579, hand369]);
    expect(result.hand.section).toBe("13579");
    expect(result.matches).toBe(8);
  });

  it("should correctly identify a Quints hand", () => {
    // FF (B), 111 (G), 2222 (R), 33333 (B)
    const quintsHand = allHands.find((h) => h.section === "Quints")!;

    const tiles = [
      ...createMeld(CRAKS, "FF"),
      ...createMeld(DOTS, "111"),
      ...createMeld(BAMS, "2222"),
      ...createMeld(CRAKS, "33333"),
    ];

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(quintsHand);
    expect(result.matches).toBe(14);
  });

  it("should correctly identify a Singles and Pairs hand", () => {
    // NN, EW, SS, 11, 22, 33, 44 in 1 suit
    const singlesPairsHand = allHands.find(
      (h) => h.section === "Singles and Pairs",
    )!;

    const tiles = [
      ...createMeld(CRAKS, "NNE"),
      ...createMeld(CRAKS, "WSS"),
      ...createMeld(CRAKS, "112"),
      ...createMeld(CRAKS, "2334"),
      ...createMeld(CRAKS, "4"),
    ]; // 14 tiles

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(singlesPairsHand);
    expect(result.matches).toBe(14);
  });

  it("should correctly identify Winds-Dragons", () => {
    // NNNN EEE WWW SSSS
    const windsHand = allHands.find((h) => h.section === "Winds-Dragons")!;

    const tiles = [
      ...createMeld(CRAKS, "NNNN"),
      ...createMeld(CRAKS, "EEE"),
      ...createMeld(CRAKS, "WWW"),
      ...createMeld(CRAKS, "SSSS"),
    ];

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(windsHand);
    expect(result.matches).toBe(14);
  });

  it("should correctly identify a Consecutive Run hand", () => {
    // 11, 222, 3333, 444, 55 in 1 suit
    const consecutiveRunHand = allHands.find(
      (h) => h.section === "Consecutive Run",
    )!;

    const tiles = [
      ...createMeld(BAMS, "11"),
      ...createMeld(BAMS, "222"),
      ...createMeld(BAMS, "3333"),
      ...createMeld(BAMS, "444"),
      ...createMeld(BAMS, "55"),
    ];

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(consecutiveRunHand);
    expect(result.matches).toBe(14);
  });

  it("should correctly identify Any Like Numbers hand", () => {
    // FF (B), 1111 (G), D (G), 1111 (R), D (R), 11 (B)
    const likeNumbersHand = allHands.find(
      (h) => h.section === "Any Like Numbers",
    )!;

    const tiles = [
      ...createMeld(CRAKS, "FF"),
      ...createMeld(DOTS, "5555"),
      ...createMeld(DOTS, "D"),
      ...createMeld(BAMS, "5555"),
      ...createMeld(BAMS, "D"),
      ...createMeld(CRAKS, "55"),
    ];

    const player: MahjongPlayer = {
      index: 0,
      concealed: tiles,
      exposed: [],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(likeNumbersHand);
    expect(result.matches).toBe(14);
  });

  it("should correctly match: FF (B), 11 (G), 222 (G), 3333 (G), DDD (G)", () => {
    const hand = allHands.find(
      (h) => h.section === "Consecutive Run" && h.text === "Any 1 Suit, Any 3 Consec. Nos.",
    )!;

    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(CRAKS, "F"),
        ...createMeld(CRAKS, "3"),
        ...createMeld(CRAKS, "DJ"),
        createTile(CRAKS, "7"),
        ...createMeld(CRAKS, "11")
      ],
      exposed: [ 
        ...createMeld(CRAKS, "444"), EXPOSED_GAP,
        ...createMeld(CRAKS, "555J"), EXPOSED_GAP,
      ],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(hand);
    expect(result.matches).toBe(11);
  });

  it("should correctly match: FF (B), 11 (G), 222 (G), 3333 (G), DDD (G)", () => {
    const hand = allHands.find(
      (h) => h.section === "Consecutive Run" && h.text === "Any 1 Suit, Any 3 Consec. Nos.",
    )!;

    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(CRAKS, "55J"),
        ...createMeld(CRAKS, "6J"),
        ...createMeld(CRAKS, "777J"),
      ],
      exposed: [ 
        ...createMeld(CRAKS, "DJJ"), EXPOSED_GAP,
      ],
    };

    const result = findBestHand(player, allHands);
    expect(result.hand).toBe(hand);
    expect(result.matches).toBe(14);
  });
});
