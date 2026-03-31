import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import type { Size } from "./types"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    size: Size
}

export default function Button({ children, className, disabled, ...props }: Props) {
    return (
        <button
            className={clsx(
                "border-4 border-t-0 border-s-0 shadow shadow-gray-600 rounded-lg p-2",
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