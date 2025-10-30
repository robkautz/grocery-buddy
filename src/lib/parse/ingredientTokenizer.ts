import type { Ingredient } from '../../types/recipe'
import { stripBulletPrefix } from './parseUtils'

function parseFractionToken(token: string): number | null {
  // e.g., "1/2" -> 0.5
  const m = token.match(/^(\d+)\/(\d+)$/)
  if (!m) return null
  const num = Number(m[1])
  const den = Number(m[2])
  if (den === 0) return null
  return num / den
}

function parseMixedNumber(tokens: string[], startIndex: number): { qty?: number; nextIndex: number } {
  // Supports patterns:
  // - "2" -> 2
  // - "1/2" -> 0.5
  // - "1 1/2" -> 1.5
  const first = tokens[startIndex]
  if (!first) return { nextIndex: startIndex }

  // Simple integer
  if (/^\d+$/.test(first)) {
    const whole = Number(first)
    const next = tokens[startIndex + 1]
    const frac = next ? parseFractionToken(next) : null
    if (frac !== null) {
      return { qty: whole + frac, nextIndex: startIndex + 2 }
    }
    return { qty: whole, nextIndex: startIndex + 1 }
  }

  // Simple fraction like 3/4
  const fractionOnly = parseFractionToken(first)
  if (fractionOnly !== null) {
    return { qty: fractionOnly, nextIndex: startIndex + 1 }
  }

  return { nextIndex: startIndex }
}

function isLikelyUnit(token: string): boolean {
  // Heuristic: tokens consisting of letters, dashes or periods are likely units (tbsp, tsp, cup, g, kg, fl-oz, oz.)
  // Avoid capturing descriptors like "large", "small" by prioritizing known-ish patterns length <= 6 or common ones
  if (!token) return false
  const cleaned = token.toLowerCase().replace(/\.$/, '')
  if (!/^[a-z][a-z.-]*$/.test(cleaned)) return false
  // Common cooking units hint (not exhaustive)
  const common = new Set([
    'tsp','tbsp','tbl','tablespoon','teaspoon','cup','cups','ml','l','dl','g','kg','mg','oz','fl-oz','lb','lbs','pound','pounds',
    'pinch','dash','clove','cloves','can','cans','package','packages'
  ])
  return common.has(cleaned) || cleaned.length <= 6
}

export function tokenizeIngredientLine(line: string): Ingredient | null {
  const text = stripBulletPrefix(line).trim()
  if (!text) return null

  const tokens = text.split(/\s+/)
  let idx = 0

  // 1) Try to parse a leading quantity (including mixed numbers)
  const { qty, nextIndex } = parseMixedNumber(tokens, idx)
  idx = nextIndex

  // If no quantity, return as item-only
  if (qty === undefined) {
    return { item: text }
  }

  // 2) Try to parse a unit right after qty
  let unit: string | undefined
  const possibleUnit = tokens[idx]
  if (possibleUnit && isLikelyUnit(possibleUnit)) {
    unit = possibleUnit.replace(/\.$/, '')
    idx += 1
  }

  // 3) The rest is the item (and possible note); keep as item for now
  const itemRest = tokens.slice(idx).join(' ').trim()
  const item = itemRest || text

  return {
    item,
    qty,
    unit,
  }
} 