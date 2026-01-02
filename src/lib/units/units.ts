export type UnitCategory = 'volume' | 'mass' | 'count' | 'unknown'

export type CanonicalUnit =
  | 'ml' | 'l' | 'tsp' | 'tbsp' | 'fl-oz' | 'cup'
  | 'g' | 'kg' | 'oz' | 'lb'
  | 'count'

export const unitAliases: Record<string, CanonicalUnit> = {
  // volume
  tsp: 'tsp', teaspoon: 'tsp', teaspoons: 'tsp',
  tbsp: 'tbsp', tablespoon: 'tbsp', tablespoons: 'tbsp', tbl: 'tbsp',
  cup: 'cup', cups: 'cup',
  'fl-oz': 'fl-oz', floz: 'fl-oz', 'fl.oz': 'fl-oz',
  ml: 'ml', milliliter: 'ml', milliliters: 'ml',
  l: 'l', liter: 'l', liters: 'l',

  // mass
  g: 'g', gram: 'g', grams: 'g',
  kg: 'kg', kilogram: 'kg', kilograms: 'kg',
  oz: 'oz', ounce: 'oz', ounces: 'oz',
  lb: 'lb', lbs: 'lb', pound: 'lb', pounds: 'lb',

  // count-like
  clove: 'count', cloves: 'count',
  can: 'count', cans: 'count',
  package: 'count', packages: 'count',
  piece: 'count', pieces: 'count',
  rib: 'count', ribs: 'count',
  count: 'count',
}

export function canonicalizeUnit(u?: string): CanonicalUnit | undefined {
  if (!u) return undefined
  const key = u.toLowerCase().replace(/\.$/, '')
  return unitAliases[key] ?? (key as CanonicalUnit)
}

export function unitCategory(u?: CanonicalUnit): UnitCategory {
  if (!u) return 'unknown'
  if (u === 'ml' || u === 'l' || u === 'tsp' || u === 'tbsp' || u === 'fl-oz' || u === 'cup') return 'volume'
  if (u === 'g' || u === 'kg' || u === 'oz' || u === 'lb') return 'mass'
  if (u === 'count') return 'count'
  return 'unknown'
} 