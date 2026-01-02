import { RecipeUpload } from '../components/RecipeUpload'
import { ChatGPTPrompt } from '../components/ChatGPTPrompt'
import { useAppStore } from '../state/store'
import { Button } from '../components/ui'
import { useState } from 'react'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeDetailModal } from '../components/RecipeDetailModal'
import { EmptyRecipesState } from '../components/EmptyState'

interface RecipesPageProps {
  onNavigate: (tab: string) => void
}

export function RecipesPage({ onNavigate: _onNavigate }: RecipesPageProps) {
  const recipes = useAppStore((s) => s.recipes)
  const deleteRecipe = useAppStore((s) => s.deleteRecipe)
  const clearAll = useAppStore((s) => s.clearAllRecipes)

  const [openId, setOpenId] = useState<string | null>(null)

  const openRecipe = recipes.find((r) => r.id === openId) || null

  return (
    <div className="py-8 px-4" role="tabpanel" id="recipes-panel" aria-labelledby="recipes-tab">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Management</h1>
              <p className="text-gray-600">Upload, organize, and manage your recipe collection</p>
            </div>
            {recipes.length > 0 && (
              <Button variant="outline" onClick={() => void clearAll()}>Clear all</Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <RecipeUpload />
            <ChatGPTPrompt />
          </div>
          <div className="space-y-4">
            <div className="grid grid-auto-fit gap-4">
              {recipes.length === 0 ? (
                <EmptyRecipesState />
              ) : (
                recipes.map((r) => (
                  <div key={r.id} onClick={() => setOpenId(r.id)} className="cursor-pointer">
                    <RecipeCard recipe={r} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {openRecipe && (
        <RecipeDetailModal
          recipe={openRecipe}
          onClose={() => setOpenId(null)}
          onDelete={async (id) => {
            await deleteRecipe(id)
            setOpenId(null)
          }}
        />
      )}
    </div>
  )
} 