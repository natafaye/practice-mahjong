import { describe, expect, it } from "vitest";
import { createMeld } from "./testUtilities";
import { CARD_2025 } from "../../_data/CARD_2025";
import { matchTilesToHand } from "../matchTilesToHand";
import { BAMS, CRAKS, DOTS, EXPOSED_GAP } from "../../constants";


describe("matchTilesToHand", () => {
  describe("2025", () => {
    // FFFF 2025 222 555
    // Any 3 Suits, Like Pungs 2s or 5s in Opp. Suits
    const hand = CARD_2025.hands.find((h) => h.section === "2025")!; 

    it("should return 14 for a matching hand", () => {
      
      const tiles = [
        ...createMeld(CRAKS, "FFFF"),
        ...createMeld(DOTS, "2025"),
        ...createMeld(BAMS, "222"),
        ...createMeld(CRAKS, "222"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should allow joker use in flowers", () => {
      const tiles = [
        ...createMeld(CRAKS, "FJJJ"),
        ...createMeld(DOTS, "2025"),
        ...createMeld(BAMS, "222"),
        ...createMeld(CRAKS, "222"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return number for a mismatched hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FFFF"),
        ...createMeld(DOTS, "2025"),
        ...createMeld(BAMS, "222"),
        ...createMeld(CRAKS, "555"), // Pungs have to match
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(11);
    });
  });

  describe("2468", () => {
    // 222, 4444, 666, 8888 in 1 suit
    const hand = CARD_2025.hands.find((h) => h.section === "2468")!; 

    it("should return 14 for a matching hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return 13 when a tile is missing", () => {
      const tiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "888"), // Only 3 eights
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(13);
    });
  });

  describe("Any Like Numbers", () => {
    // FF (B), 1111 (G), D (G), 1111 (R), D (R), 11 (B)
    const hand = CARD_2025.hands.find((h) => h.section === "Any Like Numbers")!;

    it("should return 14 for a valid hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "1111"),
        ...createMeld(DOTS, "D"),
        ...createMeld(BAMS, "1111"),
        ...createMeld(BAMS, "D"),
        ...createMeld(CRAKS, "11"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false when suits don't match the required pattern", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"), 
        ...createMeld(DOTS, "1111"),
        ...createMeld(DOTS, "D"),
        ...createMeld(BAMS, "1111"), 
        ...createMeld(BAMS, "D"),
        ...createMeld(BAMS, "11"),// Reused suit BAMS instead of CrakS
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(12);
    });
  });

  describe("Quints", () => {
    // FF (B), 111 (G), 2222 (R), 33333 (B)
    const hand = CARD_2025.hands.find((h) => h.section === "Quints")!;

    it("should return 14 for a valid quint hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "111"),
        ...createMeld(BAMS, "2222"),
        ...createMeld(CRAKS, "33333"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false for invalid consecutive numbers", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "111"),
        ...createMeld(BAMS, "2222"),
        ...createMeld(CRAKS, "44444"), // Skipped 3
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(10);
    });
  });

  describe("Consecutive Run", () => {
    // 11, 222, 3333, 444, 55 in 1 suit
    const hand = CARD_2025.hands.find((h) => h.section === "Consecutive Run")!;

    it("should return 14 for a matching consecutive run", () => {
      const tiles = [
        ...createMeld(DOTS, "11"),
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "3333"),
        ...createMeld(DOTS, "444"),
        ...createMeld(DOTS, "55"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false if jokers are used incorrectly", () => {
      const tiles = [
        ...createMeld(CRAKS, "1J"),
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "3333"),
        ...createMeld(CRAKS, "444"),
        ...createMeld(CRAKS, "55"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(13); 
    });
  });

  describe("Complex Consecutive Run: Any 5 Consec. Nos., Pair Any No. in Run, Kongs Match Pair", () => {
    // 112345 1111 1111
    const hand = CARD_2025.hands.find((h) => h.text === "Any 5 Consec. Nos., Pair Any No. in Run, Kongs Match Pair")!;

    it("should return 14 for a base matching hand (1-5, paired 1s)", () => {
      const tiles = [
        ...createMeld(BAMS, "112345"),
        ...createMeld(CRAKS, "1111"),
        ...createMeld(DOTS, "1111"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return 14 for a shifted run with a different paired number (4-8, paired 7s)", () => {
      const tiles = [
        ...createMeld(CRAKS, "456778"),
        ...createMeld(DOTS, "7777"),
        ...createMeld(BAMS, "7777"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return 14 when using Jokers validly in the kongs", () => {
      const tiles = [
        ...createMeld(DOTS, "345667"),
        ...createMeld(BAMS, "66JJ"), 
        ...createMeld(CRAKS, "6JJJ"), 
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return 13 if the kongs don't match the paired number in the run", () => {
      const tiles = [
        ...createMeld(BAMS, "233456"), // Paired 3s
        ...createMeld(CRAKS, "4444"),  // Kong of 4s (mismatch)
        ...createMeld(DOTS, "4444"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(13);
    });
  });

  describe("13579", () => {
    // 11, 333, 5555, 777, 99 in 1 suit
    const hand = CARD_2025.hands.find((h) => h.section === "13579")!;

    it("should return 14 for a matching odds hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "333"),
        ...createMeld(CRAKS, "5555"),
        ...createMeld(CRAKS, "777"),
        ...createMeld(CRAKS, "99"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false if evens are mixed in", () => {
      const tiles = [
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "333"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "777"),
        ...createMeld(CRAKS, "99"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(10);
    });
  });

  describe("Winds-Dragons", () => {
    // NNNN EEE WWW SSSS
    const hand = CARD_2025.hands.find((h) => h.section === "Winds-Dragons")!;

    it("should return 14 for a valid winds hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "NNJN"),
        ...createMeld(CRAKS, "EEE"),
        ...createMeld(CRAKS, "WWW"),
        ...createMeld(CRAKS, "SSJS"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false if a wind is the wrong length", () => {
      const tiles = [
        ...createMeld(CRAKS, "NNN"), // 3 instead of 4
        ...createMeld(CRAKS, "EEEE"), // 4 instead of 3
        ...createMeld(CRAKS, "WWW"),
        ...createMeld(CRAKS, "SSSS"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(13);
    });

    // FF 456 DD DDD DDDD
    const hand2 = CARD_2025.hands.filter((h) => h.section === "Winds-Dragons")[1]!;

    it("should return 14 for a valid dragons hand with jokers", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(CRAKS, "456"),
        ...createMeld(CRAKS, "DD"),
        ...createMeld(BAMS, "DDJ"),
        ...createMeld(DOTS, "DDDD"),
      ];
      expect(matchTilesToHand(tiles, [], hand2).matches).toBe(14);
    });

    it("should use Jokers intelligently", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(CRAKS, "456"),
        ...createMeld(CRAKS, "DD"),
        ...createMeld(BAMS, "JJD"), // These jokers
        ...createMeld(DOTS, "DD"), // Should be used here
        ...createMeld(BAMS, "DD"),
      ];
      expect(matchTilesToHand(tiles, [], hand2).matches).toBe(14);
    });

    it("should return 13 if jokers are used in a run", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(CRAKS, "45J"),
        ...createMeld(CRAKS, "DD"),
        ...createMeld(BAMS, "DDJ"),
        ...createMeld(DOTS, "DDDD"),
      ];
      expect(matchTilesToHand(tiles, [], hand2).matches).toBe(13);
    });
  });

  describe("369", () => {
    // 333 (G), 6666 (G), 666 (R), 9999 (R)
    const hand = CARD_2025.hands.find((h) => h.section === "369")!;

    it("should return 14 for a valid 369 hand", () => {
      const tiles = [
        ...createMeld(DOTS, "333"),
        ...createMeld(DOTS, "6666"),
        ...createMeld(BAMS, "666"),
        ...createMeld(BAMS, "9999"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false if wrong numbers are provided", () => {
      const tiles = [
        ...createMeld(DOTS, "333"),
        ...createMeld(DOTS, "5555"), // Invalid number 5
        ...createMeld(BAMS, "666"),
        ...createMeld(BAMS, "9999"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(10);
    });
  });

  describe("Singles and Pairs", () => {
    // NN, EW, SS, 11, 22, 33, 44
    const hand = CARD_2025.hands.find((h) => h.section === "Singles and Pairs")!;

    it("should return 14 for a valid singles and pairs hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "NN"),
        ...createMeld(CRAKS, "EW"),
        ...createMeld(CRAKS, "SS"),
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "22"),
        ...createMeld(CRAKS, "33"),
        ...createMeld(CRAKS, "44"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(14);
    });

    it("should return false if a joker is used to complete a pair", () => {
      const tiles = [
        ...createMeld(CRAKS, "NN"),
        ...createMeld(CRAKS, "EW"),
        ...createMeld(CRAKS, "SS"),
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "2J"), // Can't use joker in a pair
        ...createMeld(CRAKS, "33"),
        ...createMeld(CRAKS, "44"),
      ];
      expect(matchTilesToHand(tiles, [], hand).matches).toBe(13);
    });
  });

  describe("Exposed Melds", () => {
    // 222 (G), 4444 (G), 666 (G), 8888 (G)
    const hand = CARD_2025.hands.find((h) => h.section === "2468")!;

    it("should match when exposed meld perfectly fits a requirement", () => {
      const rackTiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      const exposedTilesRow = [
        ...createMeld(CRAKS, "4444"), // Exposed Kong of 4s
        EXPOSED_GAP
      ];
      expect(matchTilesToHand(rackTiles, exposedTilesRow, hand).matches).toBe(14);
    });

    it("should match when exposed melds have jokers", () => {
      const rackTiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      const exposedTilesRow = [
        ...createMeld(CRAKS, "4JJJ"), EXPOSED_GAP
      ];
      expect(matchTilesToHand(rackTiles, exposedTilesRow, hand).matches).toBe(14);
    });

    it("should handle multiple exposed melds separated by GAP", () => {
      const rackTiles = [
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      const exposedTilesRow = [
        ...createMeld(CRAKS, "222"), EXPOSED_GAP,                         
        ...createMeld(CRAKS, "4444"), EXPOSED_GAP
      ];
      expect(matchTilesToHand(rackTiles, exposedTilesRow, hand).matches).toBe(14);
    });

    it("should return 0 matches if exposed meld is invalid for the hand", () => {
      const rackTiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      const exposedTilesRow = [
        ...createMeld(CRAKS, "5555"), // Invalid Kong for a 2468 hand
        EXPOSED_GAP
      ];
      expect(matchTilesToHand(rackTiles, exposedTilesRow, hand).matches).toBe(0);
    });

    it("should return 0 matches if hand is concealed and exposed melds are provided", () => {
      const concealedHand = CARD_2025.hands.find((h) => h.concealed)!; 
      
      const rackTiles = createMeld(CRAKS, "11111111111");
      const exposedTilesRow = [...createMeld(CRAKS, "222")];
      
      expect(matchTilesToHand(rackTiles, exposedTilesRow, concealedHand).matches).toBe(0);
    });
  });
});