import { getDB } from '../db'
import type { Recipe, RecipeId, ParsedRecipe } from '../types/recipe'

function nowIso(): string {
  return new Date().toISOString()
}

export async function addRecipe(recipe: Omit<Recipe, 'createdAt' | 'updatedAt'>): Promise<Recipe> {
  const db = await getDB()
  const toSave: Recipe = {
    ...recipe,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }
  await db.put('recipes', toSave)
  return toSave
}

export async function addParsedRecipe(id: RecipeId, parsed: ParsedRecipe, sourceText?: string): Promise<Recipe> {
  return addRecipe({ id, ...parsed, sourceText })
}

export async function getRecipe(id: RecipeId): Promise<Recipe | undefined> {
  const db = await getDB()
  return db.get('recipes', id)
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const db = await getDB()
    return await db.getAll('recipes')
  } catch (error) {
    console.error('Error getting all recipes:', error)
    return []
  }
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe> {
  const db = await getDB()
  const existing = await db.get('recipes', recipe.id)
  const toSave: Recipe = {
    ...existing,
    ...recipe,
    updatedAt: nowIso(),
  } as Recipe
  await db.put('recipes', toSave)
  return toSave
}

export async function deleteRecipe(id: RecipeId): Promise<void> {
  const db = await getDB()
  await db.delete('recipes', id)
}

export async function clearAllRecipes(): Promise<void> {
  const db = await getDB()
  await db.clear('recipes')
} 