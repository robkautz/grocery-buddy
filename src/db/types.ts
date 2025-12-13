import type { DBSchema } from 'idb'
import type { Recipe } from '../types/recipe'
import type { AppSettings } from '../state/settingsSlice'

export interface GroceryBuddyDB extends DBSchema {
  recipes: {
    key: string
    value: Recipe
    indexes: {
      by_title: string
      by_createdAt: string
    }
  }
  settings: {
    key: string
    value: AppSettings
  }
} 