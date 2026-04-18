import type { MahjongGameData } from "../../types";

// Helper to deeply clone player hands so we don't mutate state directly
export const clonePlayers = (state: MahjongGameData) =>
  state.players.map((player) => ({
    ...player,
    exposed: [...player.exposed],
    concealed: [...player.concealed],
  }));
