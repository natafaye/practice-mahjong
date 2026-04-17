import clsx from "clsx"
import type { ReactNode } from "react"

type Props = {
    value: string | number
    name: string
    checked: boolean
    onChange: (newValue: string | number) => void
    children: ReactNode
    className?: string
    checkedClassName?: string
}

const defaultCheckedClassName = "border-amber-600 text-amber-600 focus-within:border-amber-500 focus-within:text-amber-500"

export default function RadioInput({ value, name, checked, onChange, children, className, checkedClassName = defaultCheckedClassName }: Props) {
    return (
        <label className={clsx(
            className,
            "flex text-lg p-2 border-3 rounded-lg",
            checked ? checkedClassName : "border-transparent"
        )}>
            <input
                type="radio"
                className="opacity-0 h-0 w-0"
                name={name}
                checked={checked}
                onChange={() => onChange(value)}
            />
            {children}
        </label>
    )
}