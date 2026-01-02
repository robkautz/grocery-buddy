import { describe, it, expect } from 'vitest'
import { scaleAndAggregate } from '../../../../lib/aggregate/scaleAndAggregate'
import { roundToStorePacks } from '../../../../lib/aggregate/roundToStorePacks'
import type { Recipe, Ingredient } from '../../../../types/recipe'

describe('scaleAndAggregate', () => {
  const mockRecipes: Recipe[] = [
    {
      id: 'recipe1',
      title: 'Pancakes',
      servings: 4,
      ingredients: [
        { qty: 1, unit: 'cup', item: 'flour' },
        { qty: 2, unit: 'tbsp', item: 'sugar' },
        { qty: 1, unit: 'tsp', item: 'baking powder' },
        { qty: 1, unit: 'cup', item: 'milk' },
        { qty: 2, unit: undefined, item: 'eggs' }
      ],
      instructions: ['Mix ingredients'],
      tags: ['breakfast'],
      sourceText: ''
    },
    {
      id: 'recipe2',
      title: 'Waffles',
      servings: 6,
      ingredients: [
        { qty: 2, unit: 'cup', item: 'flour' },
        { qty: 3, unit: 'tbsp', item: 'sugar' },
        { qty: 2, unit: 'tsp', item: 'baking powder' },
        { qty: 1.5, unit: 'cup', item: 'milk' },
        { qty: 3, unit: undefined, item: 'eggs' }
      ],
      instructions: ['Mix ingredients'],
      tags: ['breakfast'],
      sourceText: ''
    }
  ]

  it('scales and aggregates ingredients correctly', () => {
    const multipliers = {
      'recipe1': 1.5, // 6 servings
      'recipe2': 1    // 6 servings
    }

    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers })

    // Check that ingredients are properly scaled and aggregated
    expect(result).toHaveLength(5) // 5 unique ingredients

    // Find specific ingredients
    const flour = result.find(item => item.name === 'flour')
    const sugar = result.find(item => item.name === 'sugar')
    const bakingPowder = result.find(item => item.name === 'baking powder')
    const milk = result.find(item => item.name === 'milk')
    const eggs = result.find(item => item.name === 'eggs')

    expect(flour).toBeDefined()
    expect(flour?.qty).toBeCloseTo(3.5, 1) // 1.5 * 1 + 1 * 2 = 3.5 cups

    expect(sugar).toBeDefined()
    expect(sugar?.qty).toBeCloseTo(6, 1) // 1.5 * 2 + 1 * 3 = 6 tbsp

    expect(bakingPowder).toBeDefined()
    expect(bakingPowder?.qty).toBeCloseTo(3.5, 1) // 1.5 * 1 + 1 * 2 = 3.5 tsp

    expect(milk).toBeDefined()
    expect(milk?.qty).toBeCloseTo(3, 1) // 1.5 * 1 + 1 * 1.5 = 3 cups

    expect(eggs).toBeDefined()
    expect(eggs?.qty).toBeCloseTo(6, 1) // 1.5 * 2 + 1 * 3 = 6 eggs
  })

  it('handles empty selection', () => {
    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers: {} })
    expect(result).toEqual([])
  })

  it('handles single recipe selection', () => {
    const multipliers = { 'recipe1': 2 }

    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers })

    expect(result).toHaveLength(5)
    
    const flour = result.find(item => item.name === 'flour')
    expect(flour?.qty).toBeCloseTo(2, 1) // 2 * 1 = 2 cups
  })

  it('handles zero multiplier', () => {
    const multipliers = { 'recipe1': 0 }

    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers })
    expect(result).toEqual([])
  })

  it('handles fractional multipliers', () => {
    const multipliers = { 'recipe1': 0.5 }

    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers })

    const flour = result.find(item => item.name === 'flour')
    expect(flour?.qty).toBeCloseTo(0.5, 1) // 0.5 * 1 = 0.5 cups
  })

  it('handles ingredients without units', () => {
    const multipliers = { 'recipe1': 1 }

    const result = scaleAndAggregate({ recipes: mockRecipes, multipliers })

    const eggs = result.find(item => item.name === 'eggs')
    expect(eggs).toBeDefined()
    expect(eggs?.qty).toBeCloseTo(2, 1)
    expect(eggs?.unit).toBeUndefined()
  })

  it('handles duplicate ingredients with different units', () => {
    const recipesWithDuplicates: Recipe[] = [
      {
        id: 'recipe1',
        title: 'Recipe 1',
        servings: 4,
        ingredients: [
          { qty: 1, unit: 'cup', item: 'flour' },
          { qty: 100, unit: 'g', item: 'flour' }
        ],
        instructions: ['Mix'],
        tags: [],
        sourceText: ''
      }
    ]

    const multipliers = { 'recipe1': 1 }

    const result = scaleAndAggregate({ recipes: recipesWithDuplicates, multipliers })

    // Should have two separate flour entries since units are different
    const flourEntries = result.filter(item => item.name === 'flour')
    expect(flourEntries).toHaveLength(2)
  })
})

describe('roundToStorePacks', () => {
  const mockItems = [
    { name: 'flour', qty: 2.3, unit: 'cup' },
    { name: 'eggs', qty: 7, unit: undefined },
    { name: 'ground beef', qty: 1.8, unit: 'lb' },
    { name: 'canned tomatoes', qty: 0.7, unit: 'can' },
    { name: 'milk', qty: 1.2, unit: 'gallon' }
  ]

  it('rounds eggs to dozen packs', () => {
    const result = roundToStorePacks(mockItems)
    
    const eggs = result.find(item => item.name === 'eggs')
    expect(eggs).toBeDefined()
    expect(eggs?.qty).toBe(12) // Rounded up to next dozen
  })

  it('rounds ground beef to pound increments', () => {
    const result = roundToStorePacks(mockItems)
    
    const beef = result.find(item => item.name === 'ground beef')
    expect(beef).toBeDefined()
    expect(beef?.qty).toBe(2) // Rounded up to 2 lbs
  })

  it('rounds canned goods to whole cans', () => {
    const result = roundToStorePacks(mockItems)
    
    const tomatoes = result.find(item => item.name === 'canned tomatoes')
    expect(tomatoes).toBeDefined()
    expect(tomatoes?.qty).toBe(1) // Rounded up to 1 can
  })

  it('rounds milk to gallon increments', () => {
    const result = roundToStorePacks(mockItems)
    
    const milk = result.find(item => item.name === 'milk')
    expect(milk).toBeDefined()
    expect(milk?.qty).toBe(2) // Rounded up to 2 gallons
  })

  it('handles items without rounding rules', () => {
    const items = [
      { name: 'salt', qty: 0.5, unit: 'tsp' },
      { name: 'pepper', qty: 0.25, unit: 'tsp' }
    ]

    const result = roundToStorePacks(items)
    
    const salt = result.find(item => item.name === 'salt')
    const pepper = result.find(item => item.name === 'pepper')
    
    expect(salt?.qty).toBe(0.5) // No rounding applied
    expect(pepper?.qty).toBe(0.25) // No rounding applied
  })

  it('handles empty input', () => {
    const result = roundToStorePacks([])
    expect(result).toEqual([])
  })

  it('handles items with zero quantity', () => {
    const items = [
      { name: 'flour', qty: 0, unit: 'cup' },
      { name: 'eggs', qty: 0, unit: undefined }
    ]

    const result = roundToStorePacks(items)
    
    const flour = result.find(item => item.name === 'flour')
    const eggs = result.find(item => item.name === 'eggs')
    
    expect(flour?.qty).toBe(0)
    expect(eggs?.qty).toBe(0)
  })

  it('handles negative quantities', () => {
    const items = [
      { name: 'flour', qty: -1, unit: 'cup' }
    ]

    const result = roundToStorePacks(items)
    
    const flour = result.find(item => item.name === 'flour')
    expect(flour?.qty).toBe(-1) // Negative quantities preserved
  })

  it('applies custom rounding thresholds', () => {
    const items = [
      { name: 'flour', qty: 2.1, unit: 'cup' }
    ]

    const result = roundToStorePacks(items)
    
    const flour = result.find(item => item.name === 'flour')
    expect(flour?.qty).toBe(2) // Should round down if close to whole number
  })
})
