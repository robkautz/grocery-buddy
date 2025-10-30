import type { RecipeId } from '../types/recipe'

export interface GroceryItemOverride {
  name?: string
  qty?: number
  unit?: string
}

export interface SelectionSlice {
  selectedIds: Set<RecipeId>
  multipliers: Record<RecipeId, number>
  overrides: Record<string, GroceryItemOverride>
  owned: Record<string, boolean>
  toggleSelect: (id: RecipeId) => void
  setMultiplier: (id: RecipeId, multiplier: number) => void
  setOverride: (key: string, override: GroceryItemOverride) => void
  clearOverride: (key: string) => void
  toggleOwned: (key: string) => void
  clearSelection: () => void
}

export function createSelectionSlice(
  set: (partial: Partial<SelectionSlice> | ((state: SelectionSlice) => Partial<SelectionSlice>)) => void
): SelectionSlice {
  return {
    selectedIds: new Set<RecipeId>(),
    multipliers: {},
    overrides: {},
    owned: {},

    toggleSelect(id) {
      set((state) => {
        const next = new Set(state.selectedIds)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return { selectedIds: next }
      })
    },

    setMultiplier(id, multiplier) {
      set((state) => ({ multipliers: { ...state.multipliers, [id]: multiplier } }))
    },

    setOverride(key, override) {
      set((state) => ({ overrides: { ...state.overrides, [key]: { ...state.overrides[key], ...override } } }))
    },

    clearOverride(key) {
      set((state) => {
        const next = { ...state.overrides }
        delete next[key]
        return { overrides: next }
      })
    },

    toggleOwned(key) {
      set((state) => ({ owned: { ...state.owned, [key]: !state.owned[key] } }))
    },

    clearSelection() {
      set({ selectedIds: new Set<RecipeId>(), multipliers: {}, overrides: {}, owned: {} })
    },
  }
} 