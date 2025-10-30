import { Card, Badge } from './ui'
import type { Recipe } from '../types/recipe'

interface SelectableRecipeCardProps {
  recipe: Recipe
  selected: boolean
  onToggle: (id: string) => void
}

export function SelectableRecipeCard({ recipe, selected, onToggle }: SelectableRecipeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(recipe.id)}
      className="text-left w-full focus-ring"
      aria-pressed={selected}
      aria-describedby={`recipe-${recipe.id}-servings recipe-${recipe.id}-tags`}
    >
      <Card padding="md" hover="glow" className={`transition-all duration-300 ${selected ? 'ring-2 ring-primary-500 scale-[1.02]' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
            {recipe.servings && (
              <p id={`recipe-${recipe.id}-servings`} className="text-sm text-gray-600 mt-1">Servings: {recipe.servings}</p>
            )}
            {recipe.tags.length > 0 && (
              <div id={`recipe-${recipe.id}-tags`} className="mt-2 flex flex-wrap gap-2" role="list" aria-label="Recipe tags">
                {recipe.tags.map((t) => (
                  <Badge key={t} variant="secondary" role="listitem">{t}</Badge>
                ))}
              </div>
            )}
          </div>
          <div 
            className={`h-5 w-5 rounded-full border flex items-center justify-center ${selected ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300'}`}
            aria-hidden="true"
          >
            {selected && (
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </Card>
    </button>
  )
} 