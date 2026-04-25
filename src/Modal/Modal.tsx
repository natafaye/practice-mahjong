import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import type { Size } from "../types"
import clsx from "clsx"

type Props = {
    show: boolean
    setShow: (show: boolean) => void
    children?: ReactNode
    size?: Size
}

export default function Modal({ show, setShow, size = "md", children }: Props) {
    if (!show) return ""

    return createPortal(
        <div
            className="fixed inset-0 overflow-hidden flex items-center justify-center bg-black/80 z-50"
            onClick={() => setShow(false)}
        >
            <div
                className={clsx(
                  "bg-white rounded-lg shadow-xl w-full max-h-[90vh] p-5 flex flex-col",
                  { sm: "max-w-sm", md: "max-w-md", lg: "max-w-3xl" }[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}