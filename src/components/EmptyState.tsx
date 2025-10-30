import { Button } from './ui/Button'

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 fade-in">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4 transition-transform duration-300 hover:scale-110">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-200">{title}</h3>
        <p className="text-gray-600 mb-6 transition-colors duration-200">{message}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary" className="transition-all duration-200 hover:scale-105">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

// Specialized empty state components for different scenarios
export function EmptyRecipesState({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      title="No recipes yet"
      message="Get started by uploading your first recipe. You can paste recipe text or upload a file."
      actionLabel="Upload Recipe"
      onAction={onAction}
    />
  )
}

export function EmptySelectionState({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      title="No recipes to select"
      message="You need to add some recipes first before you can create a grocery list."
      actionLabel="Add Recipes"
      onAction={onAction}
    />
  )
}

export function EmptyListState({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      title="No grocery list"
      message="Select some recipes first to generate your grocery list."
      actionLabel="Select Recipes"
      onAction={onAction}
    />
  )
}

export function EmptySearchState({ query }: { query: string }) {
  return (
    <div className="text-center py-12 px-4 fade-in">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4 transition-transform duration-300">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600 mb-6">
          No recipes match your search for "{query}". Try adjusting your search terms or filters.
        </p>
      </div>
    </div>
  )
} 