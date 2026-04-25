import type { ReactNode } from "react"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

type Props = {
    children?: ReactNode
    setShow: (show: boolean) => void
    className?: string
}

export default function ModalHeader({ children, setShow, className }: Props) {
    return (
        <div className={clsx(className, "flex justify-between mb-5")}>
            <h2 className="text-2xl font-bold">{children}</h2>
            <button
                onClick={() => setShow(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    )
}