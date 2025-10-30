import type { Ingredient } from '../../types/recipe'
import { canonicalizeUnit } from './units'

export interface NormalizedIngredient extends Ingredient {
  unit?: ReturnType<typeof canonicalizeUnit>
}

export function normalizeIngredient(input: Ingredient): NormalizedIngredient {
  const unit = canonicalizeUnit(input.unit)

  // crude note extraction: move trailing comma phrase into note
  let item = input.item
  let note = input.note
  const m = item.match(/^(.*?),(.*)$/)
  if (m) {
    item = m[1].trim()
    note = (note ? `${note}; ` : '') + m[2].trim()
  }

  return {
    item,
    qty: input.qty,
    unit,
    note,
  }
} 