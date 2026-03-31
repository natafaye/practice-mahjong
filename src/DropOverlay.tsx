import { useDragDropMonitor, useDroppable } from "@dnd-kit/react"
import { useState, type ReactNode } from "react"

type Props = {
    dropId: string
    show: boolean
    backgroundColor: string
    textShadowColor: string
    children: ReactNode
}

export default function DropOverlay({ dropId, show, backgroundColor, textShadowColor, children }: Props) {
    const [isDragging, setIsDragging] = useState(false)
    const { ref } = useDroppable({
        id: dropId
    })
    useDragDropMonitor({
        onDragStart: () => setIsDragging(true),
        onDragEnd: () => setIsDragging(false)
    })
    return (
        <div
            ref={ref}
            className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center"
            style={{ display: isDragging && show ? "flex" : "none" }}
        >
            <div
                className="absolute top-0 left-0 right-0 bottom-0 opacity-80 starting:opacity-0 transition-opacity"
                style={{ backgroundColor: backgroundColor }}
            />
            <p
                className="relative text-4xl font-bold p-1 rounded-lg text-white text-shadow-md"
                style={{
                    "--tw-text-shadow-color": `color-mix(in oklab, var(${textShadowColor}) var(--tw-text-shadow-alpha), transparent)`
                } as any}
            >
                {children}
            </p>
        </div>
    )
}