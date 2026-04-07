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
                "flex items-center justify-center transition-[width] duration-200 ease-in-out rounded-lg bg-linear-to-t from-white/30 to-40%",
                isEmpty ? "w-10 md:w-17 ps-1 md:ps-0" : "w-auto",
                isDropTarget && "bg-white/30 rounded-lg"
            )}
        >
            {children}
        </div>
    )
}