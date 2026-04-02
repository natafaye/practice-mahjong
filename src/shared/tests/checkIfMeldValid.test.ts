import { describe, it, expect } from "vitest";
import { checkIfMeldValid } from "../checkIfMeldValid";
import { createFlower, createJoker, createTile } from "./testUtilities";
import { generateHandsData } from "../../useMahjongData/generateHandsData";
import { HANDS_2025 } from "../../useMahjongData/2025";
import { BAMS, CRAKS, DOTS, WIND_SUIT } from "../../constants";

const { melds } = generateHandsData(HANDS_2025)

describe("checkIfMeldValid", () => {
  describe("Edge Cases, Limits, and Basic Standard Suits", () => {
    it("should return false for an empty array", () => {
      expect(checkIfMeldValid([], melds)).toBe(false);
    });

    it("should safely reject an excessively large array without crashing", () => {
      const hugeMeld = Array(12).fill(createTile(BAMS, 2));
      expect(checkIfMeldValid(hugeMeld, melds)).toBe(false);
    });

    it("should validate a single standard number tile", () => {
      const meld = [createTile(CRAKS, 4)];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a pair of standard number tiles", () => {
      const meld = [createTile(DOTS, 7), createTile(DOTS, 7)];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a pair of standard number tiles if one is a Joker", () => {
      const meld = [createTile(DOTS, 7), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a meld of non-matching suits even if a Joker is present", () => {
      // Fails the suit check before the Joker check even happens
      const meld = [createTile(DOTS, 2), createTile(BAMS, 2), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it('should reject a meld made entirely of jokers', () => {
        const meld = [createJoker(), createJoker(), createJoker()]
        expect(checkIfMeldValid(meld, melds)).toBe(false)
    })
  });

  describe("Sets of identical tiles (Pungs, Kongs, Quints) with and without Jokers", () => {
    it("should validate a valid Pung (3 of a kind) without jokers", () => {
      const meld = [
        createTile(BAMS, 2),
        createTile(BAMS, 2),
        createTile(BAMS, 2),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a valid Kong (4 of a kind) with 1 joker", () => {
      const meld = [
        createTile(BAMS, 5),
        createTile(BAMS, 5),
        createTile(BAMS, 5),
        createJoker(),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a set with 2 jokers in varying positions", () => {
      const meld = [
        createJoker(),
        createTile(CRAKS, 8),
        createJoker(),
        createTile(CRAKS, 8),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Quint (5 of a kind) with 3 jokers", () => {
      const meld = [
        createJoker(),
        createJoker(),
        createTile(BAMS, 1),
        createJoker(),
        createTile(BAMS, 1),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a meld made ENTIRELY of jokers (invalid in standard rules)", () => {
      const meld = [createJoker(), createJoker(), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a set of non-identical tiles combined with a joker", () => {
      const meld = [createTile(BAMS, 2), createTile(BAMS, 3), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a set of same number but different suits combined with a joker", () => {
      const meld = [createTile(BAMS, 2), createTile(CRAKS, 2), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });

  describe("Specific Number Combinations (2468, 13579, 369)", () => {
    it("should validate a valid 2468 combo", () => {
      const meld = [
        createTile(BAMS, 2),
        createTile(BAMS, 4),
        createTile(BAMS, 6),
        createTile(BAMS, 8),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a valid 135 combo", () => {
      const meld = [
        createTile(CRAKS, 1),
        createTile(CRAKS, 3),
        createTile(CRAKS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a valid 135 combo out of order", () => {
      const meld = [
        createTile(CRAKS, 3),
        createTile(CRAKS, 1),
        createTile(CRAKS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a 2468 combo if it uses a Joker", () => {
      const meld = [
        createTile(BAMS, 2),
        createTile(BAMS, 4),
        createTile(BAMS, 6),
        createJoker(),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a 135 combo if there is a mixture of standard suits", () => {
      const meld = [
        createTile(BAMS, 1),
        createTile(CRAKS, 3),
        createTile(BAMS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });

  describe("Sets of Flowers", () => {
    it("should validate a Pung of Flowers", () => {
      const meld = [createFlower(), createFlower(), createFlower()];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Kong of Flowers containing Jokers", () => {
      const meld = [createFlower(), createFlower(), createJoker(), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });
  });

  describe("Consecutive Runs", () => {
    it("should validate a standard consecutive run", () => {
      const meld = [
        createTile(BAMS, 4),
        createTile(BAMS, 6),
        createTile(BAMS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a consecutive run that contains a Joker", () => {
      const meld = [createTile(BAMS, 4), createTile(BAMS, 5), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a consecutive run with mixed suits", () => {
      const meld = [
        createTile(BAMS, 4),
        createTile(CRAKS, 5),
        createTile(BAMS, 6),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });

  describe("NEWS and Wind Combinations", () => {
    it("should validate a complete NEWS sequence", () => {
      const meld = [
        createTile(WIND_SUIT, "N"),
        createTile(WIND_SUIT, "W"),
        createTile(WIND_SUIT, "E"),
        createTile(WIND_SUIT, "S"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a NEWS sequence that includes a Joker", () => {
      const meld = [
        createTile(WIND_SUIT, "N"),
        createTile(WIND_SUIT, "E"),
        createTile(WIND_SUIT, "W"),
        createJoker(),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should validate a Pung of a specific wind (e.g., NNN) with a Joker", () => {
      const meld = [
        createTile(WIND_SUIT, "N"),
        createTile(WIND_SUIT, "N"),
        createJoker(),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });
  });

  describe("2025 and Year Combinations", () => {
    it("should validate a standard 2025 sequence in the same suit", () => {
      const meld = [
        createTile(BAMS, 5),
        createTile(BAMS, 2),
        createTile(BAMS, 2),
        createTile(DOTS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a 2025 sequence that uses a Joker", () => {
      const meld = [
        createTile(BAMS, 2),
        createTile(DOTS, "D"),
        createJoker(),
        createTile(BAMS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });

  describe("Dragons and Soaps (Singles, Pairs, Pungs, Kongs)", () => {
    it("should validate a Single Dragon", () => {
      const meld = [createTile(BAMS, "D")];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Single Soap (White Dragon)", () => {
      const meld = [createTile(DOTS, "D")];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a Single Joker", () => {
      const meld = [createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should validate a Pair of Dragons", () => {
      const meld = [createTile(CRAKS, "D"), createTile(CRAKS, "D")];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Pair of Soaps", () => {
      const meld = [createTile(DOTS, "D"), createTile(DOTS, "D")];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a Pair of Dragons that uses a Joker", () => {
      const meld = [createTile(CRAKS, "D"), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    // --- 3. Pungs (Sets of 3) ---
    it("should validate a Pung of Dragons", () => {
      const meld = [
        createTile(BAMS, "D"),
        createTile(BAMS, "D"),
        createTile(BAMS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Pung of Dragons using Jokers", () => {
      const meld = [createTile(CRAKS, "D"), createJoker(), createJoker()];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Kong of Soaps", () => {
      const meld = [
        createTile(DOTS, "D"),
        createTile(DOTS, "D"),
        createTile(DOTS, "D"),
        createTile(DOTS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a Kong of Dragons using Jokers", () => {
      const meld = [
        createJoker(),
        createTile(BAMS, "D"),
        createJoker(),
        createTile(BAMS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject a Pung mixing Green Dragons and Red Dragons", () => {
      const meld = [
        createTile(BAMS, "D"),
        createTile(BAMS, "D"),
        createTile(CRAKS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a meld mixing Soaps and other Dragons", () => {
      const meld = [
        createTile(DOTS, "D"), // Soap
        createTile(BAMS, "D"),
        createTile(BAMS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });

    it("should reject a Pair mixing a Soap and a Dragon", () => {
      const meld = [
        createTile(DOTS, "D"), // Soap
        createTile(CRAKS, "D"),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });

  describe("Complex Consecutive Runs (6-tile sequences like 112345)", () => {
    it("should validate a 6-tile run with the pair at the beginning (e.g., 112345)", () => {
      const meld = [
        createTile(BAMS, 2),
        createTile(BAMS, 1),
        createTile(BAMS, 1),
        createTile(BAMS, 3),
        createTile(BAMS, 5),
        createTile(BAMS, 4),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should validate a 6-tile run with the pair in the middle (e.g., 345567)", () => {
      const meld = [
        createTile(DOTS, 3),
        createTile(DOTS, 4),
        createTile(DOTS, 5),
        createTile(DOTS, 5),
        createTile(DOTS, 6),
        createTile(DOTS, 7),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(true);
    });

    it("should reject the 6-tile run if a Joker is used", () => {
      const meld = [
        createTile(BAMS, 1),
        createJoker(), // Attempting to use a Joker as the second '1' in the pair
        createTile(BAMS, 2),
        createTile(BAMS, 3),
        createTile(BAMS, 4),
        createTile(BAMS, 5),
      ];
      expect(checkIfMeldValid(meld, melds)).toBe(false);
    });
  });
});
