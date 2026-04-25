import type { RootState } from "./store";

export const selectGameState = (state: RootState) => state.game.present.gameState;
export const selectPlayers = (state: RootState) => state.game.present.players;
export const selectCurrentPlayer = (state: RootState) => state.game.present.currentPlayer;
export const selectDiscard = (state: RootState) => state.game.present.discard;
export const selectWall = (state: RootState) => state.game.present.wall;
export const selectCardName = (state: RootState) => state.game.present.cardName
export const selectMelding = (state: RootState) => state.game.present.melding;
export const selectCallingPlayer = (state: RootState) => state.game.present.callingPlayer;
export const selectPassing = (state: RootState) => state.game.present.passing;
export const selectReadyToPass = (state: RootState) => state.game.present.readyToPass;
export const selectWinningPlayer = (state: RootState) => state.game.present.winningPlayer;
export const selectWinningHand = (state: RootState) => state.game.present.winningHand;
export const selectSeed = (state: RootState) => state.game.present.seed;
export const selectPlayer = (playerIndex: number | undefined) => (state: RootState) => state.game.present.players.find(p => p.index === playerIndex)

export const selectCanUndo = (state: RootState) => state.game.past.length > 0
export const selectCanRedo = (state: RootState) => state.game.future.length > 0