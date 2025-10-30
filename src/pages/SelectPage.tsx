import { useAppStore } from '../state/store'
import { SelectableRecipeCard } from '../components/SelectableRecipeCard'
import { ServingMultiplier } from '../components/ServingMultiplier'
import { EmptySelectionState } from '../components/EmptyState'

interface SelectPageProps {
  onNavigate: (tab: string) => void
}

export function SelectPage({ onNavigate }: SelectPageProps) {
  const recipes = useAppStore((s) => s.recipes)
  const selected = useAppStore((s) => s.selectedIds)
  const toggle = useAppStore((s) => s.toggleSelect)
  const multipliers = useAppStore((s) => s.multipliers)
  const setMultiplier = useAppStore((s) => s.setMultiplier)

  return (
    <div className="py-8 px-4" role="tabpanel" id="select-panel" aria-labelledby="select-tab">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Dishes</h1>
          <p className="text-gray-600">Choose which recipes to include and adjust serving sizes</p>
        </div>

        {recipes.length === 0 ? (
          <EmptySelectionState onAction={() => onNavigate('recipes')} />
        ) : (
          <div className="grid grid-auto-fit gap-4">
            {recipes.map((r) => (
              <div key={r.id} className="space-y-2">
                <SelectableRecipeCard recipe={r} selected={selected.has(r.id)} onToggle={toggle} />
                {selected.has(r.id) && (
                  <div className="pl-2">
                    <label className="text-sm text-gray-700 mr-2">Serving multiplier:</label>
                    <ServingMultiplier
                      value={multipliers[r.id] ?? 1}
                      onChange={(v) => setMultiplier(r.id, v)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 