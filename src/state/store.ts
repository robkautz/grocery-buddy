import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { RecipesSlice } from './recipesSlice'
import { createRecipesSlice } from './recipesSlice'
import type { SelectionSlice } from './selectionSlice'
import { createSelectionSlice } from './selectionSlice'
import type { SettingsSlice } from './settingsSlice'
import { createSettingsSlice } from './settingsSlice'

export type AppState = RecipesSlice & SelectionSlice & SettingsSlice

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    ...createRecipesSlice(set as any, get as any),
    ...createSelectionSlice(set as any),
    ...createSettingsSlice(set as any, get as any),
  }), { name: 'GroceryBuddyStore' })
) 