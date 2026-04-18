import type { ButtonHTMLAttributes, CSSProperties } from "react"
import clsx from "clsx"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    colors: {
        light: string,
        mid: string,
        dark: string
        text?: string
    }
}

export default function Button({ children, className, disabled, colors, style, ...props }: Props) {
    return (
        <button
            className={clsx(
                "p-2 px-3 rounded-lg cursor-pointer select-none text-nowrap border-t border-(--light) bg-(--mid) text-(--text)",
                "transition-all duration-100 [box-shadow:0_8px_0_0_var(--dark),0_12px_0_0_var(--shadow)]",
                "lg:[box-shadow:0_10px_0_0_var(--dark),0_15px_0_0_var(--shadow)]",
                !disabled && "active:translate-y-2 active:border-b-0 active:[box-shadow:0_0px_0_0_var(--dark),0_0px_0_0_var(--shadow)]",
                // "border-[3px] border-t-0 border-s-0 lg:border-b-4 lg:border-e-4",
                // "text-xs md:text-sm lg:text-base",
                // "shadow shadow-gray-600 rounded-lg text-nowrap p-2 bg-clip-padding",
                // !disabled && "active:border-transparent! active:translate-x-px active:translate-y-px",
                // "lg:active:translate-x-0.5 lg:active:translate-y-0.5 active:shadow-none!",
                className
            )}
            style={{
                ...style,
                "--light": disabled ? "var(--color-gray-200)" : colors?.light,
                "--mid": disabled ? "var(--color-gray-300)" : colors?.mid,
                "--dark": disabled ? "var(--color-gray-400)" : colors?.dark,
                "--text": disabled ? "var(--color-gray-400" : colors?.text || "white",
                "--shadow": disabled ? 
                    "color-mix(in srgb, var(--color-gray-500) 20%, transparent)" : 
                    `color-mix(in srgb, ${colors?.dark} 20%, transparent)`
            } as CSSProperties}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

// button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
//     active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
//     active:border-b-[0px]
//     transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
//     border-b-[1px] border-blue-400