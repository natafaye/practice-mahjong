import type { ReactNode } from "react"
import { createPortal } from "react-dom"

type Props = {
    show: boolean
    setShow: (show: boolean) => void
    children: ReactNode
}

export default function Modal({ show, setShow, children }: Props) {
    if (!show) return ""

    return createPortal(
        <div
            className="fixed inset-0 overflow-hidden flex items-center justify-center bg-black/80 z-50"
            onClick={() => setShow(false)}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}