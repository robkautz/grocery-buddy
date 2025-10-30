export type RecipeId = string

export interface Ingredient {
  /** The ingredient item name, e.g., "olive oil" */
  item: string
  /** Parsed numeric quantity, if present (e.g., 1.5 for "1 1/2") */
  qty?: number
  /** Unit string as provided/canonicalized later (e.g., "tbsp", "g", "cup") */
  unit?: string
  /** Free-form note/descriptor (e.g., "chopped", "room temperature") */
  note?: string
}

export interface ParsedRecipe {
  /** Recipe title from the text */
  title: string
  /** Number of servings, if provided */
  servings?: number
  /** Lowercase tags without spaces around commas */
  tags: string[]
  /** Parsed list of ingredients */
  ingredients: Ingredient[]
  /** Step-by-step instructions; one step per array item */
  instructions: string[]
}

export interface Recipe extends ParsedRecipe {
  /** Stable string id for IndexedDB key */
  id: RecipeId
  /** Original text (optional), useful for re-parse/debug */
  sourceText?: string
  /** ISO date strings (optional); set by persistence layer */
  createdAt?: string
  updatedAt?: string
} 