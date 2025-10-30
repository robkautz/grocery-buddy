import type { ParsedRecipe, Ingredient } from '../../types/recipe'
import { cleanNonEmptyLines, splitIntoSections, stripBulletPrefix, stripNumericPrefix } from './parseUtils'
import { tokenizeIngredientLine } from './ingredientTokenizer'

function parseTitle(lines: string[]): string {
  const nonEmpty = cleanNonEmptyLines(lines)
  return nonEmpty[0] ?? ''
}

function parseServings(lines: string[]): number | undefined {
  const nonEmpty = cleanNonEmptyLines(lines)
  if (nonEmpty.length === 0) return undefined
  const match = nonEmpty[0].match(/\d+/)
  if (match) return Number(match[0])
  return undefined
}

function parseTags(lines: string[]): string[] {
  const nonEmpty = cleanNonEmptyLines(lines)
  if (nonEmpty.length === 0) return []
  const first = nonEmpty[0]
  return first
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0)
}

function parseIngredientLine(line: string): Ingredient | null {
  const tokenized = tokenizeIngredientLine(line)
  if (tokenized) return tokenized
  // Fallback to item only
  const text = stripBulletPrefix(line)
  if (!text) return null
  return { item: text }
}

function parseIngredients(lines: string[]): Ingredient[] {
  const nonEmpty = cleanNonEmptyLines(lines)
  return nonEmpty
    .map(parseIngredientLine)
    .filter((i): i is Ingredient => i !== null)
}

function parseInstructions(lines: string[]): string[] {
  const nonEmpty = cleanNonEmptyLines(lines)
  // Remove numeric prefixes like "1. ", "2. "
  return nonEmpty.map(stripNumericPrefix)
}

export function parseRecipeText(input: string): ParsedRecipe {
  const sections = splitIntoSections(input)

  const title = parseTitle(sections.Title ?? [])
  const servings = parseServings(sections.Servings ?? [])
  const tags = parseTags(sections.Tags ?? [])
  const ingredients = parseIngredients(sections.Ingredients ?? [])
  const instructions = parseInstructions(sections.Instructions ?? [])

  return {
    title,
    servings,
    tags,
    ingredients,
    instructions,
  }
} 