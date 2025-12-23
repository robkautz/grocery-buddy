import type { Recipe, RecipeId } from '../types/recipe'
import * as RecipeService from '../services/recipeService'
import { loadPublicRecipes } from '../services/publicRecipesService'

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
      try {
        console.log('Starting recipe hydration...')
        
        // Load public recipes first (they're the source of truth)
        const publicRecipes = await loadPublicRecipes()
        console.log(`Hydrating: ${publicRecipes.length} public recipes loaded`)
        
        // Load recipes from database (user-uploaded recipes)
        const dbRecipes = await RecipeService.getAllRecipes()
        console.log(`Hydrating: ${dbRecipes.length} recipes from database`)
        
        // Merge recipes, avoiding duplicates
        // Public recipes take precedence (they overwrite DB recipes with same ID)
        const recipeMap = new Map<string, Recipe>()
        
        // Add DB recipes first (user-uploaded)
        for (const recipe of dbRecipes) {
          // Skip file recipes from DB - we'll use the file versions instead
          if (!recipe.id.startsWith('public_') && !recipe.id.startsWith('private_')) {
            recipeMap.set(recipe.id, recipe)
          }
        }
        
        // Add file recipes (will overwrite any DB versions, which is correct)
        for (const recipe of publicRecipes) {
          recipeMap.set(recipe.id, recipe)
        }
        
        const allRecipes = Array.from(recipeMap.values())
        console.log(`Hydrating: Total ${allRecipes.length} recipes in state`)
        set({ recipes: allRecipes, isHydrated: true })
      } catch (error) {
        console.error('Error hydrating recipes:', error)
        // Set hydrated to true even on error to prevent infinite loading
        set({ recipes: [], isHydrated: true })
      }
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