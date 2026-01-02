import { describe, it, expect } from 'vitest'
import { normalizeIngredient } from '../../../../lib/units/normalize'
import type { Ingredient } from '../../../../types/recipe'

describe('normalizeIngredient', () => {
  describe('name normalization', () => {
    it('converts to lowercase and trims whitespace', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: '  FLOUR  '
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('flour')
    })

    it('removes common descriptors and moves them to notes', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'butter, softened'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('butter')
      expect(result.note).toBe('softened')
    })

    it('handles multiple descriptors', () => {
      const ingredient: Ingredient = {
        qty: 2,
        unit: undefined,
        item: 'large eggs, beaten'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('eggs')
      expect(result.note).toBe('large, beaten')
    })

    it('preserves important cooking terms', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'extra virgin olive oil'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('extra virgin olive oil')
      expect(result.note).toBeUndefined()
    })
  })

  describe('unit normalization', () => {
    it('normalizes volume units to canonical forms', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'tablespoon',
        item: 'oil'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unit).toBe('tbsp')
    })

    it('normalizes mass units to canonical forms', () => {
      const ingredient: Ingredient = {
        qty: 500,
        unit: 'gram',
        item: 'flour'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unit).toBe('g')
    })

    it('handles unit aliases', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'teaspoon',
        item: 'salt'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unit).toBe('tsp')
    })

    it('preserves undefined units', () => {
      const ingredient: Ingredient = {
        qty: 2,
        unit: undefined,
        item: 'eggs'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unit).toBeUndefined()
    })
  })

  describe('quantity handling', () => {
    it('preserves numeric quantities', () => {
      const ingredient: Ingredient = {
        qty: 1.5,
        unit: 'cup',
        item: 'flour'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.qty).toBe(1.5)
    })

    it('handles undefined quantities', () => {
      const ingredient: Ingredient = {
        qty: undefined,
        unit: undefined,
        item: 'salt to taste'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.qty).toBeUndefined()
    })
  })

  describe('complex ingredient names', () => {
    it('handles hyphenated ingredients', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'self-rising flour'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('self-rising flour')
    })

    it('handles ingredients with parentheses', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'olive oil (extra virgin)'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('olive oil')
      expect(result.note).toBe('extra virgin')
    })

    it('handles ingredients with multiple descriptors', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'brown sugar, packed'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('brown sugar')
      expect(result.note).toBe('packed')
    })
  })

  describe('edge cases', () => {
    it('handles empty ingredient names', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: ''
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('')
    })

    it('handles ingredients with only descriptors', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'chopped'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('')
      expect(result.note).toBe('chopped')
    })

    it('handles ingredients with special characters', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'flour (sifted)'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.item).toBe('flour')
      expect(result.note).toBe('sifted')
    })
  })

  describe('unit type classification', () => {
    it('classifies volume units correctly', () => {
      const ingredient: Ingredient = {
        qty: 1,
        unit: 'cup',
        item: 'water'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unitType).toBe('volume')
    })

    it('classifies mass units correctly', () => {
      const ingredient: Ingredient = {
        qty: 100,
        unit: 'g',
        item: 'flour'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unitType).toBe('mass')
    })

    it('classifies count units correctly', () => {
      const ingredient: Ingredient = {
        qty: 2,
        unit: undefined,
        item: 'eggs'
      }
      
      const result = normalizeIngredient(ingredient)
      expect(result.unitType).toBe('count')
    })
  })
})
