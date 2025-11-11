import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { RecipesSlice } from './recipesSlice'
import { createRecipesSlice } from './recipesSlice'
import type { SelectionSlice } from './selectionSlice'
import { createSelectionSlice } from './selectionSlice'

export type AppState = RecipesSlice & SelectionSlice

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    ...createRecipesSlice(set as any, get as any),
    ...createSelectionSlice(set as any),
  }), { name: 'GroceryBuddyStore' })
)

// Expose store for manual recipe addition via console
if (typeof window !== 'undefined') {
  (window as any).__groceryBuddyStore = useAppStore
} 