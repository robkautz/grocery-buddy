import type { Recipe, RecipeId } from '../types/recipe'
import * as RecipeService from '../services/recipeService'

export interface RecipesSlice {
  recipes: Recipe[]
  isHydrated: boolean
  hydrateFromDB: () => Promise<void>
  addRecipe: (recipe: Omit<Recipe, 'createdAt' | 'updatedAt'>) => Promise<Recipe>
  updateRecipe: (recipe: Recipe) => Promise<Recipe>
  deleteRecipe: (id: RecipeId) => Promise<void>
  clearAllRecipes: () => Promise<void>
  getRecipeById: (id: RecipeId) => Recipe | undefined
}

export function createRecipesSlice(
  set: (partial: Partial<RecipesSlice> | ((state: RecipesSlice) => Partial<RecipesSlice>)) => void,
  get: () => RecipesSlice
): RecipesSlice {
  return {
    recipes: [],
    isHydrated: false,

    async hydrateFromDB() {
      const items = await RecipeService.getAllRecipes()
      set({ recipes: items, isHydrated: true })
    },

    async addRecipe(recipeInput) {
      const saved = await RecipeService.addRecipe(recipeInput)
      set((state) => ({ recipes: [saved, ...state.recipes] }))
      return saved
    },

    async updateRecipe(recipe) {
      const saved = await RecipeService.updateRecipe(recipe)
      set((state) => ({
        recipes: state.recipes.map((r) => (r.id === saved.id ? saved : r)),
      }))
      return saved
    },

    async deleteRecipe(id) {
      await RecipeService.deleteRecipe(id)
      set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) }))
    },

    async clearAllRecipes() {
      await RecipeService.clearAllRecipes()
      set({ recipes: [] })
    },

    getRecipeById(id) {
      return get().recipes.find((r) => r.id === id)
    },
  }
} 