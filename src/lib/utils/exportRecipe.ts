import type { Recipe } from '../../types/recipe'

export function exportRecipeToFile(recipe: Recipe): void {
  if (!recipe.sourceText) {
    throw new Error('Recipe must have sourceText to export')
  }

  // Generate filename from recipe title
  const sanitizedTitle = recipe.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  const filename = `${sanitizedTitle}.txt`
  
  // Create blob and download
  const blob = new Blob([recipe.sourceText], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

