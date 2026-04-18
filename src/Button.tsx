import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {}

export default function Button({ children, className, disabled, style, ...props }: Props) {
    return (
        <button
            className={clsx(
                "border-[3px] border-t-0 border-s-0 lg:border-b-4 lg:border-e-4",
                "text-xs md:text-sm lg:text-base",
                "shadow shadow-gray-600 rounded-lg text-nowrap p-2 bg-clip-padding",
                "disabled:bg-gray-400 disabled:border-gray-500 disabled:text-gray-500",
                !disabled && "active:border-transparent! active:translate-x-px active:translate-y-px lg:active:translate-x-0.5 lg:active:translate-y-0.5 active:shadow-none!",
                className
            )}
            style={style}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}