import type { MahjongGameData } from "../types";
import type { MahjongAction } from "./MahjongAction";
import { markReadyToPass } from "./actions/markReadyToPass";
import { drawFromWall } from "./actions/drawFromWall";
import { discardTile } from "./actions/discardTile";
import { swapJoker } from "./actions/swapJoker";
import { pickUpDiscard } from "./actions/pickUpDiscard";
import { addToPass } from "./actions/addToPass";
import { restartGame } from "./actions/restartGame";
import { removeFromPass } from "./actions/removeFromPass";
import { skipDiscard } from "./actions/skipDiscard";
import { addToMeld } from "./actions/addToMeld";
import { cancelMeld } from "./actions/cancelMeld";
import { cancelCharleston } from "./actions/cancelCharleston";
import { confirmMeld } from "./actions/confirmMeld";
import { rearrangeUnexposed } from "./actions/rearrangeUnexposed";
import { doAIPasses } from "./aiPlayer/doAIPasses";
import { doAICalls } from "./aiPlayer/doAICalls";

/**
 * Responds to Mahjong actions from the human player and triggers any responding AI actions
 */
export function mahjongReducer(state: MahjongGameData, action: MahjongAction): MahjongGameData {
  console.log(state, action);
  let nextState = state;
  switch (action.type) {
    case "RESTART":
      return restartGame(action.payload);

    case "ADD_TO_PASS":
      return addToPass(nextState, action.payload);

    case "MARK_READY_TO_PASS":
      nextState = markReadyToPass(nextState, action.payload);
      nextState = doAIPasses(nextState);
      return nextState;

    case "DRAW_FROM_WALL":
      return drawFromWall(nextState, action.payload);

    case "JOKER_SWAP":
      return swapJoker(nextState, action.payload);

    case "DISCARD_TILE":
      nextState = discardTile(nextState, action.payload);
      nextState = doAICalls(nextState);
      return nextState;

    case "SKIP_DISCARD":
      nextState = skipDiscard(nextState, action.payload);
      nextState = doAICalls(nextState);
      return nextState;

    case "PICK_UP_DISCARD":
      return pickUpDiscard(nextState, action.payload);

    case "ADD_TO_MELD":
      return addToMeld(nextState, action.payload);

    case "CONFIRM_MELD":
      return confirmMeld(nextState, action.payload);

    case "REARRANGE_UNEXPOSED":
      return rearrangeUnexposed(nextState, action.payload);

    case "REMOVE_FROM_PASS":
      return removeFromPass(nextState, action.payload);

    case "CANCEL_MELD":
      return cancelMeld(nextState);

    case "CANCEL_CHARLESTON":
      return cancelCharleston(nextState);

    default:
      return state;
  }
}
