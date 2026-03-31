import { useDroppable } from "@dnd-kit/react";
import clsx from "clsx";
import { type ReactNode } from "react";
import useIsDraggingDiscard from "../useMahjongData/useIsDraggingDiscard";

type Props = {
    index: number
    children: ReactNode
    isEmpty: boolean
}

export default function RackSlot({ index, children, isEmpty }: Props) {
    const isDraggingDiscard = useIsDraggingDiscard()
    const { ref, isDropTarget } = useDroppable({ 
        id: "SLOT_" + index,
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