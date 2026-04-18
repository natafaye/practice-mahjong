/**
 * Get the index of the player this player's tiles will be given to, in this pass
 */ 
export const getGiveToIndex = (
    direction: string, 
    takeFromIndex: number, 
    passingLength: number
) => passingLength === 2
  ? (takeFromIndex + 1) % 2
  : (4 + takeFromIndex + { LEFT: 1, RIGHT: -1, OVER: 2 }[direction]!) % 4;