import { Button } from './ui'

interface ServingMultiplierProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function ServingMultiplier({ value, onChange, min = 0.25, max = 10 }: ServingMultiplierProps) {
  function clamp(n: number) {
    return Math.max(min, Math.min(max, n))
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={() => onChange(clamp(Number((value - 0.25).toFixed(2))))}>-</Button>
      <input
        type="number"
        step={0.25}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <Button variant="secondary" size="sm" onClick={() => onChange(clamp(Number((value + 0.25).toFixed(2))))}>+</Button>
    </div>
  )
} 