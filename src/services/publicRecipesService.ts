import { parseRecipeText } from '../lib/parse/recipeParser'
import { validateParsedRecipe } from '../lib/parse/validators'
import type { Recipe, RecipeId } from '../types/recipe'
import * as RecipeService from './recipeService'

const PUBLIC_RECIPES_PREFIX = 'public_'
const PRIVATE_RECIPES_PREFIX = 'private_'

function generateRecipeId(fileName: string, isPrivate: boolean): RecipeId {
  // Create a stable ID based on filename
  const baseName = fileName.replace('.txt', '').toLowerCase().replace(/[^a-z0-9]/g, '_')
  const prefix = isPrivate ? PRIVATE_RECIPES_PREFIX : PUBLIC_RECIPES_PREFIX
  return `${prefix}${baseName}`
}

async function loadRecipesFromFolder(folder: string, isPrivate: boolean): Promise<Recipe[]> {
  try {
    // Fetch the recipes manifest
    const manifestResponse = await fetch(`${folder}/recipes.json`)
    if (!manifestResponse.ok) {
      console.warn(`Could not load recipes manifest from ${folder} (status: ${manifestResponse.status}), skipping`)
      return []
    }

    const recipeFiles: string[] = await manifestResponse.json()
    const folderType = isPrivate ? 'private' : 'public'
    console.log(`Loading ${recipeFiles.length} ${folderType} recipes from ${folder}:`, recipeFiles)
    const loadedRecipes: Recipe[] = []

    // Load each recipe file
    for (const fileName of recipeFiles) {
      try {
        const response = await fetch(`${folder}/${fileName}`)
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

        const id = generateRecipeId(fileName, isPrivate)
        
        // Always use the file version for file recipes (they're the source of truth)
        // Store using recipeService which will save to localStorage
        const recipe = await RecipeService.addRecipe({
          id,
          ...parsed,
          sourceText: text,
        })
        
        loadedRecipes.push(recipe)
        console.log(`✓ Loaded ${folderType} recipe: ${recipe.title} (${fileName})`)
      } catch (error) {
        console.error(`Error loading recipe ${fileName}:`, error)
      }
    }

    return loadedRecipes
  } catch (error) {
    console.error(`Error loading recipes from ${folder}:`, error)
    return []
  }
}

export async function loadPublicRecipes(): Promise<Recipe[]> {
  try {
    // Load public recipes (committed to git)
    const publicRecipes = await loadRecipesFromFolder('/recipes', false)
    
    // Load private recipes (gitignored)
    const privateRecipes = await loadRecipesFromFolder('/recipes/private', true)
    
    const allRecipes = [...publicRecipes, ...privateRecipes]
    console.log(`Loaded ${allRecipes.length} file recipes successfully (${publicRecipes.length} public, ${privateRecipes.length} private)`)
    return allRecipes
  } catch (error) {
    console.error('Error loading file recipes:', error)
    return []
  }
}

export function isPublicRecipe(id: RecipeId): boolean {
  return id.startsWith(PUBLIC_RECIPES_PREFIX)
}

export function isPrivateRecipe(id: RecipeId): boolean {
  return id.startsWith(PRIVATE_RECIPES_PREFIX)
}

export function isFileRecipe(id: RecipeId): boolean {
  return id.startsWith(PUBLIC_RECIPES_PREFIX) || id.startsWith(PRIVATE_RECIPES_PREFIX)
}

