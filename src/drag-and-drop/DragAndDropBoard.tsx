import React, { useState } from 'react';
import { DragDropProvider, DragOverlay, type DragStartEvent, type DragEndEvent, useDroppable, useDraggable } from '@dnd-kit/react';
import { calculateNewSlots } from './calculateNewSlots';

// Initialize 20 slots, some empty (null), some with items
const INITIAL_SLOTS: Array<{ id: string, content: string } | null> = Array.from({ length: 20 }, (_) => null);
INITIAL_SLOTS[3] = { id: 'tile-1', content: 'A' };
INITIAL_SLOTS[4] = { id: 'tile-2', content: 'B' };
INITIAL_SLOTS[5] = { id: 'tile-3', content: 'C' };
INITIAL_SLOTS[6] = { id: 'tile-4', content: 'D' };
INITIAL_SLOTS[7] = { id: 'tile-5', content: 'E' };

export default function DragAndDropBoard() {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const onDragStart: DragStartEvent = ({ operation: { source } }) => {
    if (source) setActiveId(source.id as string);
  };

  const onDragEnd: DragEndEvent = ({ operation: { source, target, canceled } }) => {
    setActiveId(null);
    
    // Bail if dropped outside a valid target or canceled
    if (!target || !source || canceled) return;

    const sourceIndex = slots.findIndex(slot => slot?.id === source.id);
    const targetIndex = parseInt((target.id as string).replace('slot-', ''), 10);

    if (sourceIndex === targetIndex) return;

    // Execute the shift algorithm
    setSlots((prevSlots) => calculateNewSlots(prevSlots, sourceIndex, targetIndex));
  };

  return (
    <DragDropProvider 
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-1 p-5">
        {slots.map((item, index) => (
          <DroppableSlot key={`slot-${index}`} id={`slot-${index}`} isEmpty={!item}>
            {item && <DraggableTile key={item.id} id={item.id} content={item.content} isDragging={activeId === item.id} />}
          </DroppableSlot>
        ))}
      </div>

      <DragOverlay>
        {activeId ? <DraggableTile id={activeId} content={slots.find(s => s?.id === activeId)?.content} /> : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

type DroppableProps = {
  id: string;
  isEmpty: boolean;
  children: React.ReactNode;
}

export function DroppableSlot({ id, isEmpty, children }: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id });

  const style = {
    // Collapse to 20px if empty, otherwise fit content
    width: isEmpty ? '40px' : 'auto',
    height: '60px',
    backgroundColor: isDropTarget ? '#e0f70a' : '#ffffff',
    transition: 'width 0.2s ease, background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

type DraggableProps = {
  id: string;
  content?: string;
  isDragging?: boolean;
}

export function DraggableTile({ id, content, isDragging }: DraggableProps) {
  const { ref } = useDraggable({ id });

  const style = {
    opacity: isDragging ? 0 : 1, // Hide original while dragging overlay
    width: '60px',
    height: '60px',
    backgroundColor: '#42a5f5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    cursor: 'grab',
    touchAction: 'none',
  };

  return (
    <div ref={ref} style={style}>
      {content}
    </div>
  );
}