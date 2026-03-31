
export function calculateNewSlots(slots: any[], sourceIndex: number, targetIndex: number) {
  const newSlots = [...slots];
  const itemToMove = newSlots[sourceIndex];
  
  // Temporarily remove the item from its source
  newSlots[sourceIndex] = null;

  // If the target is empty, just place it there
  if (newSlots[targetIndex] === null) {
    newSlots[targetIndex] = itemToMove;
    return newSlots;
  }

  // If target is occupied, find the nearest empty slot
  let leftEmpty = -1;
  let rightEmpty = -1;

  for (let i = targetIndex - 1; i >= 0; i--) {
    if (newSlots[i] === null) { leftEmpty = i; break; }
  }
  for (let i = targetIndex + 1; i < newSlots.length; i++) {
    if (newSlots[i] === null) { rightEmpty = i; break; }
  }

  // Determine which way to shift based on nearest distance
  const distLeft = leftEmpty === -1 ? Infinity : targetIndex - leftEmpty;
  const distRight = rightEmpty === -1 ? Infinity : rightEmpty - targetIndex;

  if (distLeft < distRight && leftEmpty !== -1) {
    // Shift left
    for (let i = leftEmpty; i < targetIndex; i++) {
      newSlots[i] = newSlots[i + 1];
    }
  } else if (rightEmpty !== -1) {
    // Shift right
    for (let i = rightEmpty; i > targetIndex; i--) {
      newSlots[i] = newSlots[i - 1];
    }
  } else {
    // No room left on the board! Send it back to source.
    newSlots[sourceIndex] = itemToMove;
    return newSlots; 
  }

  // Finally, insert the dragged item into the newly cleared target slot
  newSlots[targetIndex] = itemToMove;
  return newSlots;
}