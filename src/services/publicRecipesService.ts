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
      console.warn(`Could not load recipes manifest (status: ${manifestResponse.status}), skipping public recipes`)
      return []
    }

    const recipeFiles: string[] = await manifestResponse.json()
    console.log(`Loading ${recipeFiles.length} public recipes:`, recipeFiles)
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

        // Always use the file version for public recipes (they're the source of truth)
        // Update the database with the latest version from the file
        const db = await getDB()
        await db.put('recipes', recipe)
        loadedRecipes.push(recipe)
        console.log(`✓ Loaded public recipe: ${recipe.title} (${fileName})`)
      } catch (error) {
        console.error(`Error loading recipe ${fileName}:`, error)
      }
    }

    console.log(`Loaded ${loadedRecipes.length} public recipes successfully`)
    return loadedRecipes
  } catch (error) {
    console.error('Error loading public recipes:', error)
    return []
  }
}

export function isPublicRecipe(id: RecipeId): boolean {
  return id.startsWith(PUBLIC_RECIPES_PREFIX)
}

