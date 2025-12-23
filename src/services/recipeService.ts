import { parseRecipeText } from '../lib/parse/recipeParser'
import type { Recipe, RecipeId, ParsedRecipe } from '../types/recipe'

const RECIPES_STORAGE_KEY = 'grocery-buddy-recipes'
const RECIPE_IDS_KEY = 'grocery-buddy-recipe-ids'

function nowIso(): string {
  return new Date().toISOString()
}

function getRecipeIds(): RecipeId[] {
  try {
    const stored = localStorage.getItem(RECIPE_IDS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecipeIds(ids: RecipeId[]): void {
  localStorage.setItem(RECIPE_IDS_KEY, JSON.stringify(ids))
}

function getRecipeText(id: RecipeId): string | null {
  try {
    return localStorage.getItem(`${RECIPES_STORAGE_KEY}_${id}`)
  } catch {
    return null
  }
}

function saveRecipeText(id: RecipeId, text: string): void {
  localStorage.setItem(`${RECIPES_STORAGE_KEY}_${id}`, text)
}

function deleteRecipeText(id: RecipeId): void {
  localStorage.removeItem(`${RECIPES_STORAGE_KEY}_${id}`)
}

function textToRecipe(id: RecipeId, text: string, createdAt?: string, updatedAt?: string): Recipe {
  const parsed = parseRecipeText(text)
  return {
    id,
    ...parsed,
    sourceText: text,
    createdAt: createdAt || nowIso(),
    updatedAt: updatedAt || nowIso(),
  }
}

export async function addRecipe(recipe: Omit<Recipe, 'createdAt' | 'updatedAt'>): Promise<Recipe> {
  if (!recipe.sourceText) {
    throw new Error('Recipe must have sourceText to be stored')
  }

  const ids = getRecipeIds()
  if (!ids.includes(recipe.id)) {
    ids.push(recipe.id)
    saveRecipeIds(ids)
  }

  const now = nowIso()
  saveRecipeText(recipe.id, recipe.sourceText)
  
  return textToRecipe(recipe.id, recipe.sourceText, now, now)
}

export async function addParsedRecipe(id: RecipeId, parsed: ParsedRecipe, sourceText?: string): Promise<Recipe> {
  // If no sourceText provided, we need to reconstruct it
  // This shouldn't happen in practice, but we'll handle it
  if (!sourceText) {
    throw new Error('sourceText is required when adding a parsed recipe')
  }
  return addRecipe({ id, ...parsed, sourceText })
}

export async function getRecipe(id: RecipeId): Promise<Recipe | undefined> {
  const text = getRecipeText(id)
  if (!text) return undefined
  
  return textToRecipe(id, text)
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const ids = getRecipeIds()
    const recipes: Recipe[] = []
    
    for (const id of ids) {
      const text = getRecipeText(id)
      if (text) {
        recipes.push(textToRecipe(id, text))
      }
    }
    
    return recipes
  } catch (error) {
    console.error('Error getting all recipes:', error)
    return []
  }
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe> {
  if (!recipe.sourceText) {
    throw new Error('Recipe must have sourceText to be updated')
  }

  const existing = await getRecipe(recipe.id)
  const ids = getRecipeIds()
  if (!ids.includes(recipe.id)) {
    ids.push(recipe.id)
    saveRecipeIds(ids)
  }

  const updatedAt = nowIso()
  const createdAt = existing?.createdAt || updatedAt
  saveRecipeText(recipe.id, recipe.sourceText)
  
  return textToRecipe(recipe.id, recipe.sourceText, createdAt, updatedAt)
}

export async function deleteRecipe(id: RecipeId): Promise<void> {
  deleteRecipeText(id)
  const ids = getRecipeIds()
  const filtered = ids.filter(recipeId => recipeId !== id)
  saveRecipeIds(filtered)
}

export async function clearAllRecipes(): Promise<void> {
  const ids = getRecipeIds()
  for (const id of ids) {
    deleteRecipeText(id)
  }
  saveRecipeIds([])
}
