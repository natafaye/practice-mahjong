import { type CSSProperties, type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import clsx from "clsx";
import { useIsDragging, SLOT_ID } from "../DraggingContext";
import { tileSizes } from "../Tile/tileSizes";
import type { Size } from "../types";

type Props = {
    index: number
    size: Size
    children: ReactNode
    isEmpty: boolean
    className?: string
    style?: CSSProperties
}

export default function RackSlot({ index, size, children, isEmpty, className, style }: Props) {
    const { isDraggingDiscard, isDraggingPass } = useIsDragging()
    const { ref, isDropTarget } = useDroppable({ 
        id: SLOT_ID + index,
        disabled: isDraggingDiscard || isDraggingPass
    });

    return (
        <div 
            ref={ref}
            className={clsx(
                "flex items-center justify-center rounded-lg bg-linear-to-t from-white/30 to-40%",
                isEmpty ? tileSizes[size].tileClassName + " aspect-[2.1/3] ps-1 md:ps-0" : "w-auto",
                isDropTarget && "bg-white/30 rounded-lg",
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}