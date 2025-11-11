import { parseRecipeText } from '../lib/parse/recipeParser'
import { validateParsedRecipe } from '../lib/parse/validators'
import type { Recipe, RecipeId } from '../types/recipe'
import { getDB } from '../db'

const PUBLIC_RECIPES_PREFIX = 'public_'

function generatePublicRecipeId(fileName: string): RecipeId {
  // Create a stable ID based on filename
  const baseName = fileName.replace('.txt', '').toLowerCase().replace(/[^a-z0-9]/g, '_')
  return `${PUBLIC_RECIPES_PREFIX}${baseName}`
}

export async function loadPublicRecipes(): Promise<Recipe[]> {
  try {
    // Fetch the recipes manifest
    const manifestResponse = await fetch('/recipes/recipes.json')
    if (!manifestResponse.ok) {
      console.warn('Could not load recipes manifest, skipping public recipes')
      return []
    }

    const recipeFiles: string[] = await manifestResponse.json()
    const loadedRecipes: Recipe[] = []

    // Load each recipe file
    for (const fileName of recipeFiles) {
      try {
        const response = await fetch(`/recipes/${fileName}`)
        if (!response.ok) {
          console.warn(`Could not load recipe file: ${fileName}`)
          continue
        }

        const text = await response.text()
        const parsed = parseRecipeText(text)
        const validation = validateParsedRecipe(parsed)

        if (!validation.ok) {
          console.warn(`Invalid recipe in ${fileName}:`, validation.issues)
          continue
        }

        const id = generatePublicRecipeId(fileName)
        const recipe: Recipe = {
          id,
          ...parsed,
          sourceText: text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Check if recipe already exists in DB
        const db = await getDB()
        const existing = await db.get('recipes', id)
        
        if (!existing) {
          // Add new public recipe to database
          await db.put('recipes', recipe)
          loadedRecipes.push(recipe)
        } else {
          // Recipe exists, but check if it needs updating
          // For now, we'll skip updating to preserve user modifications
          loadedRecipes.push(existing)
        }
      } catch (error) {
        console.error(`Error loading recipe ${fileName}:`, error)
      }
    }

    return loadedRecipes
  } catch (error) {
    console.error('Error loading public recipes:', error)
    return []
  }
}

export function isPublicRecipe(id: RecipeId): boolean {
  return id.startsWith(PUBLIC_RECIPES_PREFIX)
}

