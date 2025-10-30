import type { CanonicalUnit } from './units'

const volumeToMl: Record<Extract<CanonicalUnit, 'ml' | 'l' | 'tsp' | 'tbsp' | 'fl-oz' | 'cup'>, number> = {
  ml: 1,
  l: 1000,
  tsp: 4.92892,
  tbsp: 14.7868,
  'fl-oz': 29.5735,
  cup: 236.588,
}

const massToG: Record<Extract<CanonicalUnit, 'g' | 'kg' | 'oz' | 'lb'>, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
}

export function convert(qty: number, from: CanonicalUnit, to: CanonicalUnit): number | null {
  if (from === to) return qty

  // volume
  if (from in volumeToMl && to in volumeToMl) {
    const inMl = qty * volumeToMl[from as keyof typeof volumeToMl]
    return inMl / volumeToMl[to as keyof typeof volumeToMl]
  }

  // mass
  if (from in massToG && to in massToG) {
    const inG = qty * massToG[from as keyof typeof massToG]
    return inG / massToG[to as keyof typeof massToG]
  }

  // cannot convert across categories
  return null
} 