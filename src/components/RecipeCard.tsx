import { Card, Badge } from './ui'
import type { Recipe } from '../types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card padding="md" hover="glow" className="fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200">{recipe.title}</h3>
          {recipe.servings && (
            <p className="text-sm text-gray-600 mt-1 transition-colors duration-200">Servings: {recipe.servings}</p>
          )}
          {recipe.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {recipe.tags.map((t) => (
                <Badge key={t} variant="secondary" className="transition-all duration-200 hover:scale-105">{t}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 