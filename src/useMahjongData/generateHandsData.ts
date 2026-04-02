import type { MahjongHand, MahjongHandsData } from "../types";

/**
 * Gets two arrays of strings
 * hands: All the passed in hands (passes right through from parameter)
 * sections: All the sections listed in hands
 * melds: All the possible melds (for example, "234" and "2025" and "FFF")
 * callableMelds: Only the callable melds (only sets of 3, 4, and 5)
 */
export const generateHandsData = (hands: MahjongHand[]): MahjongHandsData => {
  // Sections
  const sections = [ ...new Set(hands.map((hand) => hand.section)) ];

  // All melds
  const melds = [ ...new Set(hands.flatMap((hand) => hand.melds.flatMap((set) => set.numbers))) ];
  // Account for soaps instead of dragons
  melds.push(...melds.filter((m) => m.includes("D")).map((m) => m.replaceAll("D", "0")));

  // All callable melds (aka only sets of 3, 4, and 5)
  const callableMelds = melds.filter(
    (meld) => meld.length > 2 && meld.match(/^(.)\1*$/),
  );

  return {
    hands,
    sections,
    melds,
    callableMelds
  }
}
