interface LanguageOption {
    value: string
    label: string
}

interface LanguageSelectorProps {
    value: string
    onChange: (value: string) => void
    options: LanguageOption[]
    className?: string
}

export default function LanguageSelector({
    value,
    onChange,
    options,
    className
}: LanguageSelectorProps) {
  return (
    <select 
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-transparent outline-none">
        {options.map((option) => (
            <option
                key={option.value}
                value={option.value}
            >
                {option.label}
            </option>
        ))}
    </select>
  )
}
