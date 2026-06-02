interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export const Input = ({
    value,
    onChange,
    placeholder = "검색어를 입력하세요.",
    className
}: InputProps) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full bg-transparent outline-none placeholder:text-gray-400 ${className}`}
        />
    )
}
