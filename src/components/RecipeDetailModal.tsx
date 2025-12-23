import { useEffect } from 'react'
import type { Recipe } from '../types/recipe'
import { Button, Card, Badge } from './ui'
import { exportRecipeToFile } from '../lib/utils/exportRecipe'

interface RecipeDetailModalProps {
  recipe: Recipe
  onClose: () => void
  onDelete: (id: string) => Promise<void> | void
}

export function RecipeDetailModal({ recipe, onClose, onDelete }: RecipeDetailModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop-enter-active">
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" onClick={onClose} />

      <Card padding="lg" shadow="lg" className="relative z-10 max-w-2xl w-full modal-content-enter-active">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{recipe.title}</h2>
            {recipe.servings && (
              <p className="text-sm text-gray-500 mt-1">Servings: {recipe.servings}</p>
            )}
            {recipe.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {recipe.tags.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus-ring rounded transition-all duration-200 hover:scale-110 hover:bg-gray-100 p-1">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingredients</h3>
            <ul className="space-y-1 text-gray-800 text-sm">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.qty !== undefined && <span>{ing.qty} </span>}
                  {ing.unit && <span>{ing.unit} </span>}
                  <span>{ing.item}</span>
                  {ing.note && <span className="text-gray-500">, {ing.note}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Instructions</h3>
            <ol className="space-y-2 text-gray-800 text-sm list-decimal list-inside">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="danger" onClick={() => onDelete(recipe.id)}>Delete</Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                try {
                  exportRecipeToFile(recipe)
                } catch (error) {
                  console.error('Failed to export recipe:', error)
                  alert('Failed to export recipe. Make sure the recipe has source text.')
                }
              }}
            >
              Export Recipe
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 