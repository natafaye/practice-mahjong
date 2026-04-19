import { CARDS } from "../_data/CARDS";
import type { MahjongHandsData } from "../types";

// A cache so we only calculate the MahjongHandsData once
const cache = new Map<string, MahjongHandsData>();

/**
 * Gets two arrays of strings
 * name: The name of this card (2025, 2026, etc)
 * hands: All the passed in hands (passes right through from parameter)
 * sections: All the sections listed in hands
 * melds: All the possible melds (for example, "234" and "2025" and "FFF")
 * callableMelds: Only the callable melds (only sets of 3, 4, and 5)
 */
export const getHandsData = (name: string): MahjongHandsData => {
  // If it's already been calculated, just return the cached value
  if (cache.has(name)) {
    return cache.get(name)!;
  }

  // We should never have a name that doesn't match a card
  const { hands } = CARDS.find(card => card.name === name)!

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

  const result = {
    name, 
    hands,
    sections,
    melds,
    callableMelds
  };

  // Save to cache and return
  cache.set(name, result);
  return result;
}
