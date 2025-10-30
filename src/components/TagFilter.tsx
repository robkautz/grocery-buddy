import { Badge, Button, Card } from './ui'

interface TagFilterProps {
  allTags: string[]
  selected: Set<string>
  onToggle: (tag: string) => void
  onClear: () => void
}

export function TagFilter({ allTags, selected, onToggle, onClear }: TagFilterProps) {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Filter by tags</h4>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>

      {selected.size > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {Array.from(selected).map((tag) => (
            <Badge key={tag} variant="primary" removable onRemove={() => onToggle(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isActive = selected.has(tag)
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                isActive
                  ? 'bg-primary-100 text-primary-800 border-primary-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </Card>
  )
} 