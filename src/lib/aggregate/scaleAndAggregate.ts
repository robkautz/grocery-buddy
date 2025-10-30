import type { Recipe } from '../../types/recipe'
import { normalizeIngredient } from '../units/normalize'
import type { CanonicalUnit } from '../units/units'
import { convert } from '../units/convert'

export interface AggregatedItemKey {
  name: string
  unit?: CanonicalUnit
}

export interface AggregatedItem extends AggregatedItemKey {
  qty: number
  note?: string
}

export interface AggregateInput {
  recipes: Recipe[]
  multipliers: Record<string, number>
}

export function scaleAndAggregate({ recipes, multipliers }: AggregateInput): AggregatedItem[] {
  const map = new Map<string, AggregatedItem>()

  for (const recipe of recipes) {
    const mult = multipliers[recipe.id] ?? 1

    for (const ing of recipe.ingredients) {
      const norm = normalizeIngredient(ing)
      const qty = (norm.qty ?? 1) * mult
      const unit = norm.unit

      // Build a key based on name + unit to aggregate
      const key = `${norm.item.toLowerCase()}__${unit ?? 'unitless'}`
      const existing = map.get(key)

      if (existing) {
        // if unit matches, just add qty
        if (existing.unit === unit) {
          existing.qty += qty
        } else if (existing.unit && unit) {
          // try to convert into existing unit
          const converted = convert(qty, unit, existing.unit)
          if (converted !== null) existing.qty += converted
          else existing.qty += qty // fallback
        } else {
          existing.qty += qty
        }
      } else {
        map.set(key, {
          name: norm.item,
          unit,
          qty,
          note: norm.note,
        })
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
} 