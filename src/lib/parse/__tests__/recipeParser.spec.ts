import { describe, it, expect } from 'vitest'
import { parseRecipeText } from '../recipeParser'

describe('parseRecipeText', () => {
  it('parses a complete recipe with all sections', () => {
    const recipeText = `Title: Chocolate Chip Cookies
Servings: 24
Tags: dessert, cookies, baking
Ingredients:
- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 tsp salt
- 1 cup butter, softened
- 3/4 cup granulated sugar
- 3/4 cup packed brown sugar
- 2 large eggs
- 2 tsp vanilla extract
- 2 cups chocolate chips
Instructions:
1. Preheat oven to 375°F (190°C)
2. Mix flour, baking soda, and salt in a bowl
3. Cream butter and sugars until fluffy
4. Beat in eggs and vanilla
5. Gradually blend in flour mixture
6. Stir in chocolate chips
7. Drop rounded tablespoons onto ungreased cookie sheets
8. Bake 9-11 minutes until golden brown`

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Chocolate Chip Cookies')
    expect(result.servings).toBe(24)
    expect(result.tags).toEqual(['dessert', 'cookies', 'baking'])
    expect(result.ingredients).toHaveLength(9)
    expect(result.instructions).toHaveLength(8)
    
    // Check first ingredient
    expect(result.ingredients[0]).toEqual({
      qty: 2.25,
      unit: 'cup',
      item: 'all-purpose flour'
    })
    
    // Check first instruction
    expect(result.instructions[0]).toBe('Preheat oven to 375°F (190°C)')
  })

  it('handles missing optional sections', () => {
    const recipeText = `Title: Simple Recipe
Ingredients:
- 1 cup flour
Instructions:
1. Mix ingredients`

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Simple Recipe')
    expect(result.servings).toBeUndefined()
    expect(result.tags).toEqual([])
    expect(result.ingredients).toHaveLength(1)
    expect(result.instructions).toHaveLength(1)
  })

  it('handles empty sections gracefully', () => {
    const recipeText = `Title: Empty Recipe
Servings: 
Tags:
Ingredients:
Instructions:`

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Empty Recipe')
    expect(result.servings).toBeUndefined()
    expect(result.tags).toEqual([])
    expect(result.ingredients).toEqual([])
    expect(result.instructions).toEqual([])
  })

  it('handles malformed sections', () => {
    const recipeText = `Title: Malformed Recipe
Servings: not a number
Tags: tag1, tag2, tag3
Ingredients:
- 1 cup flour
- invalid ingredient line
- 2 cups sugar
Instructions:
1. First step
2. Second step`

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Malformed Recipe')
    expect(result.servings).toBeUndefined() // Should be undefined for non-numeric
    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3'])
    expect(result.ingredients).toHaveLength(2) // Should skip invalid line
    expect(result.instructions).toHaveLength(2)
  })

  it('handles case-insensitive section headers', () => {
    const recipeText = `TITLE: Case Test
SERVINGS: 4
TAGS: test
INGREDIENTS:
- 1 cup flour
INSTRUCTIONS:
1. Mix ingredients`

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Case Test')
    expect(result.servings).toBe(4)
    expect(result.tags).toEqual(['test'])
    expect(result.ingredients).toHaveLength(1)
    expect(result.instructions).toHaveLength(1)
  })

  it('handles whitespace and formatting variations', () => {
    const recipeText = `Title:   Whitespace Test   
Servings:   6   
Tags:   tag1,   tag2,   tag3   
Ingredients:
-   1   cup   flour   
- 2 cups sugar
Instructions:
1.   First step   
2. Second step   `

    const result = parseRecipeText(recipeText)

    expect(result.title).toBe('Whitespace Test')
    expect(result.servings).toBe(6)
    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3'])
    expect(result.ingredients).toHaveLength(2)
    expect(result.instructions).toHaveLength(2)
    expect(result.instructions[0]).toBe('First step')
    expect(result.instructions[1]).toBe('Second step')
  })
})
