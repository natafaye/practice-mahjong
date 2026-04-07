import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"
import type { Size } from "./types"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: Size
}

export default function Button({ children, className, disabled, size = "md", ...props }: Props) {
    return (
        <button
            className={clsx(
                "border-3 border-t-0 border-s-0 lg:border-b-4 lg:border-e-4",
                "shadow shadow-gray-600 rounded-lg p-2",
                "disabled:bg-gray-400 disabled:border-gray-500 disabled:text-gray-500",
                !disabled && "active:border-0 active:mt-1 active:shadow-transparent",
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}