import { useDroppable } from "@dnd-kit/react";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
    index: number
    children: ReactNode
    isEmpty: boolean
}

export default function RackSlot({ index, children, isEmpty }: Props) {
    const { ref, isDropTarget } = useDroppable({ 
        id: "SLOT_" + index
    });
    return (
        <div 
            ref={ref}
            className={clsx(
                "flex items-center justify-center transition-all duration-200 ease-in-out",
                isEmpty ? "w-4 md:w-5 mx-1" : "w-auto",
                isDropTarget && "bg-white/30 rounded-lg"
            )}
        >
            {children}
        </div>
    )
}