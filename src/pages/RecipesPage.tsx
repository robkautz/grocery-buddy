import { RecipeUpload } from '../components/RecipeUpload'
import { useAppStore } from '../state/store'
import { Card, Button } from '../components/ui'
import { useMemo, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { TagFilter } from '../components/TagFilter'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeDetailModal } from '../components/RecipeDetailModal'
import { EmptyRecipesState, EmptySearchState } from '../components/EmptyState'

interface RecipesPageProps {
  onNavigate: (tab: string) => void
}

export function RecipesPage({ onNavigate: _onNavigate }: RecipesPageProps) {
  const recipes = useAppStore((s) => s.recipes)
  const deleteRecipe = useAppStore((s) => s.deleteRecipe)
  const clearAll = useAppStore((s) => s.clearAllRecipes)

  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [openId, setOpenId] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const r of recipes) r.tags.forEach((t) => set.add(t))
    return Array.from(set).sort()
  }, [recipes])

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase()
    return recipes.filter((r) => {
      const matchesTitle = lower.length === 0 || r.title.toLowerCase().includes(lower)
      const matchesTags = selectedTags.size === 0 || r.tags.some((t) => selectedTags.has(t))
      return matchesTitle && matchesTags
    })
  }, [recipes, query, selectedTags])

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  function clearTags() {
    setSelectedTags(new Set())
  }

  const openRecipe = filtered.find((r) => r.id === openId) || null

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
          <div>
            <RecipeUpload />
          </div>
          <div className="space-y-4">
            <Card padding="lg">
              <div className="space-y-4">
                <SearchBar value={query} onChange={setQuery} />
                <TagFilter allTags={allTags} selected={selectedTags} onToggle={toggleTag} onClear={clearTags} />
              </div>
            </Card>

            <div className="grid grid-auto-fit gap-4">
              {filtered.length === 0 ? (
                recipes.length === 0 ? (
                  <EmptyRecipesState />
                ) : (
                  <EmptySearchState query={query} />
                )
              ) : (
                filtered.map((r) => (
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