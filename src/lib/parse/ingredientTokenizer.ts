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
  // - "1.5" -> 1.5
  // - "1/2" -> 0.5
  // - "1 1/2" -> 1.5
  const first = tokens[startIndex]
  if (!first) return { nextIndex: startIndex }

  // Decimal number like 1.5
  if (/^\d+\.\d+$/.test(first)) {
    return { qty: Number(first), nextIndex: startIndex + 1 }
  }

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
  // Only recognize known units or very short abbreviations (<= 4 chars) to avoid false positives like "eggs", "onion"
  if (!token) return false
  const cleaned = token.toLowerCase().replace(/\.$/, '')
  if (!/^[a-z][a-z.-]*$/.test(cleaned)) return false
  // Common cooking units hint (not exhaustive)
  const common = new Set([
    'tsp','tbsp','tbl','tablespoon','tablespoons','teaspoon','teaspoons','cup','cups','ml','l','dl','g','kg','mg','gram','grams','oz','fl-oz','lb','lbs','pound','pounds',
    'pinch','dash','clove','cloves','can','cans','package','packages','rib','ribs'
  ])
  // Blacklist common food items that might be short enough to trigger the length heuristic
  const blacklist = new Set(['egg', 'eggs', 'onion', 'onions'])
  if (blacklist.has(cleaned)) return false
  // Only use length heuristic for very short tokens (<= 4) to avoid false positives
  return common.has(cleaned) || (cleaned.length <= 4 && cleaned.length >= 1)
}

export function tokenizeIngredientLine(line: string): Ingredient | null {
  const text = stripBulletPrefix(line).trim()
  if (!text) return { item: '', qty: undefined, unit: undefined }

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

  // Skip separator words like "of" that appear between unit and item
  if (tokens[idx]?.toLowerCase() === 'of') {
    idx += 1
  }

  // 3) The rest is the item (and possible note); keep as item for now
  const itemRest = tokens.slice(idx).join(' ').trim()
  const item = itemRest || ''

  return {
    item,
    qty,
    unit,
  }
} 