import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import clsx from "clsx";
import { useIsDragging, SLOT_ID } from "../drag-and-drop";

type Props = {
    index: number
    children: ReactNode
    isEmpty: boolean
}

export default function RackSlot({ index, children, isEmpty }: Props) {
    const { isDraggingDiscard } = useIsDragging()
    const { ref, isDropTarget } = useDroppable({ 
        id: SLOT_ID + index,
        disabled: isDraggingDiscard
    });

    return (
        <div 
            ref={ref}
            className={clsx(
                "flex items-center justify-center transition-all duration-200 ease-in-out",
                isEmpty ? "w-8 md:w-12 mx-1" : "w-auto",
                isDropTarget && "bg-white/30 rounded-lg"
            )}
        >
            {children}
        </div>
    )
}