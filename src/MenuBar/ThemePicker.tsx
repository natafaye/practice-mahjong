import RadioInput from "../RadioInput"
import { THEMES } from "../useTheme"

type Props = {
    value: string
    onChange: (newThemeName: string) => void
}

export default function ThemePicker({ value, onChange }: Props) {
    return (
        <div className="flex flex-wrap justify-around gap-3">
            {THEMES.map(theme => (
                <RadioInput key={theme.themeName}
                    name="theme"
                    value={theme.themeName}
                    checked={value === theme.themeName}
                    onChange={() => onChange(theme.themeName)}
                    checkedClassName="border-gray-800 focus-within:border-gray-500"
                >
                    <div className="w-18">
                        <div className="h-4 rounded-t-lg" style={{ background: theme.tileLight }}></div>
                        <div className="py-1 text-xs text-center" style={{ background: theme.table, color: theme.tableVeryDark }}>
                            {theme.themeName}
                        </div>
                        <div className="h-4 rounded-b-lg" style={{ background: theme.rackLight }}></div>
                    </div>
                </RadioInput>
            ))}
        </div>
    )
}