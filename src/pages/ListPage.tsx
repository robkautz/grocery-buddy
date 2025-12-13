import { useAppStore } from '../state/store'
import { useMemo, useState } from 'react'
import { scaleAndAggregate } from '../lib/aggregate/scaleAndAggregate'
import { defaultPacksConfig } from '../lib/aggregate/packsConfig'
import { roundToStorePacks } from '../lib/aggregate/roundToStorePacks'
import { categorize, type Category } from '../lib/aggregate/categories'
import { Card, Button } from '../components/ui'
import { GroceryItemRow } from '../components/GroceryItemRow'
import { formatListAsText } from '../lib/utils/formatListAsText'
import { copyText } from '../lib/utils/clipboard'
import { EmptyRecipesState, EmptyListState } from '../components/EmptyState'

interface ListPageProps {
  onNavigate: (tab: string) => void
}

export function ListPage({ onNavigate }: ListPageProps) {
  const recipes = useAppStore((s) => s.recipes)
  const selected = useAppStore((s) => s.selectedIds)
  const multipliers = useAppStore((s) => s.multipliers)
  const overrides = useAppStore((s) => s.overrides)
  const owned = useAppStore((s) => s.owned)
  const setOverride = useAppStore((s) => s.setOverride)
  const toggleOwned = useAppStore((s) => s.toggleOwned)
  const pantryStaples = useAppStore((s) => s.settings.pantryStaples)

  const [copied, setCopied] = useState(false)

  const selectedRecipes = useMemo(() => recipes.filter((r) => selected.has(r.id)), [recipes, selected])

  const aggregated = useMemo(() => {
    const base = scaleAndAggregate({ recipes: selectedRecipes, multipliers })
    return roundToStorePacks(base, defaultPacksConfig)
  }, [selectedRecipes, multipliers])

  const withOverrides = useMemo(() => {
    return aggregated
      .filter((i) => {
        // Filter out pantry staples
        const itemName = i.name.toLowerCase()
        return !pantryStaples.some(staple => itemName.includes(staple) || staple.includes(itemName))
      })
      .map((i) => {
        const key = `${i.name.toLowerCase()}__${i.unit ?? 'unitless'}`
        const ov = overrides[key]
        return {
          key,
          name: ov?.name ?? i.name,
          qty: ov?.qty ?? i.qty,
          unit: ov?.unit ?? i.unit,
          owned: !!owned[key],
        }
      })
  }, [aggregated, overrides, owned, pantryStaples])

  const grouped = useMemo(() => {
    const groups = new Map<Category, typeof withOverrides>()
    for (const item of withOverrides) {
      const cat = categorize(item.name)
      if (!groups.has(cat)) groups.set(cat, [])
      groups.get(cat)!.push(item)
    }
    return groups
  }, [withOverrides])

  async function onCopy() {
    const groups = Array.from(grouped.entries()).map(([cat, items]) => ({
      category: cat,
      items: items.map((i) => ({ name: i.name, qty: i.qty, unit: i.unit })),
    }))
    const text = formatListAsText(groups)
    const ok = await copyText(text)
    setCopied(ok)
    setTimeout(() => setCopied(false), 1500)
  }

  function onPrint() {
    window.print()
  }

  return (
    <div className="py-8 px-4" role="tabpanel" id="list-panel" aria-labelledby="list-tab">
      <div className="container mx-auto max-w-5xl print-container">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Grocery List</h1>
              <p className="text-gray-600">Generated from your selected recipes and serving multipliers</p>
            </div>
            {selectedRecipes.length > 0 && (
              <div className="no-print flex items-center gap-2">
                <Button variant="secondary" onClick={onCopy}>{copied ? 'Copied!' : 'Copy'}</Button>
                <Button variant="outline" onClick={onPrint}>Print</Button>
              </div>
            )}
          </div>
        </div>

        {selectedRecipes.length === 0 ? (
          recipes.length === 0 ? (
            <EmptyRecipesState onAction={() => onNavigate('recipes')} />
          ) : (
            <EmptyListState onAction={() => onNavigate('select')} />
          )
        ) : (
          <div className="space-y-6">
            {Array.from(grouped.entries()).map(([cat, items]) => (
              <Card key={cat} padding="lg" className="print-card fade-in">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-200">{cat}</h2>
                <ul className="space-y-2">
                  {items.map((i, index) => (
                    <div 
                      key={i.key}
                      className="list-item-enter-active"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <GroceryItemRow
                        itemKey={i.key}
                        name={i.name}
                        qty={i.qty}
                        unit={i.unit}
                        owned={i.owned}
                        onToggleOwned={toggleOwned}
                        onUpdate={(key, update) => setOverride(key, update)}
                      />
                    </div>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 