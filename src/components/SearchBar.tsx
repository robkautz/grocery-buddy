import { useId } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search recipes...' }: SearchBarProps) {
  const inputId = useId()

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">Search</label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
} 