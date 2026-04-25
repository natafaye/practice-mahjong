const WINS_STORAGE_KEY = "mahjong_hand_wins";

export type WinCounts = Record<string, number>

/**
 * Get all the win data
 */
const getWinData = (): Record<string, string[]> => {
  const data = localStorage.getItem(WINS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Returns all wins as a count for each hand
 * (rather than a list of seeds)
 */
export const getWinStats = () => {
  const winData = getWinData();
  const counts: WinCounts = {};
  for (const [handId, seeds] of Object.entries(winData)) {
    counts[handId] = seeds.length;
  }
  return counts;
};

/**
 * Record a win
 * Only saves if the user hasn't won with this seed and this hand yet
 */
export const recordHandWin = (handId: string, gameSeed: string) => {
  const winData = getWinData();
  // Initialize the array for this hand if it doesn't exist
  if (!winData[handId]) {
    winData[handId] = [];
  }
  // Add the seed if it's unique, then save
  if (!winData[handId].includes(gameSeed)) {
    winData[handId].push(gameSeed);
    localStorage.setItem(WINS_STORAGE_KEY, JSON.stringify(winData));
  }
};