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
    // Styling from https://www.creative-tim.com/twcomponents/component/3d-button-2
    return (
        <button
            className={clsx(
                "bg-(--mid) text-(--text) border-t border-(--light) rounded-lg cursor-pointer select-none text-nowrap p-2 px-3",
                "[box-shadow:0_6px_0_0_var(--dark),0_9px_0_0_var(--shadow)] transition-all duration-100",
                "lg:[box-shadow:0_8px_0_0_var(--dark),0_12px_0_0_var(--shadow)]",
                !disabled && "active:[box-shadow:0_0px_0_0_var(--dark),0_0px_0_0_var(--shadow)] active:translate-y-2 active:border-b-0",
                "disabled:opacity-25",
                className
            )}
            style={{
                ...style,
                "--light": colors?.light,
                "--mid": colors?.mid,
                "--dark": colors?.dark,
                "--text": colors?.text || "white",
                "--shadow": `color-mix(in srgb, ${colors?.dark} 20%, transparent)`
            } as CSSProperties}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}