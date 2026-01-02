import { describe, it, expect } from 'vitest'
import { convert } from '../../../../lib/units/convert'

describe('convert', () => {
  describe('volume conversions', () => {
    it('converts between teaspoons and tablespoons', () => {
      expect(convert(3, 'tsp', 'tbsp')).toBe(1)
      expect(convert(1, 'tbsp', 'tsp')).toBe(3)
      expect(convert(6, 'tsp', 'tbsp')).toBe(2)
    })

    it('converts between tablespoons and cups', () => {
      expect(convert(16, 'tbsp', 'cup')).toBe(1)
      expect(convert(1, 'cup', 'tbsp')).toBe(16)
      expect(convert(8, 'tbsp', 'cup')).toBe(0.5)
    })

    it('converts between teaspoons and cups', () => {
      expect(convert(48, 'tsp', 'cup')).toBe(1)
      expect(convert(1, 'cup', 'tsp')).toBe(48)
      expect(convert(24, 'tsp', 'cup')).toBe(0.5)
    })

    it('converts between fluid ounces and cups', () => {
      expect(convert(8, 'fl-oz', 'cup')).toBe(1)
      expect(convert(1, 'cup', 'fl-oz')).toBe(8)
      expect(convert(4, 'fl-oz', 'cup')).toBe(0.5)
    })

    it('converts between milliliters and liters', () => {
      expect(convert(1000, 'ml', 'l')).toBe(1)
      expect(convert(1, 'l', 'ml')).toBe(1000)
      expect(convert(500, 'ml', 'l')).toBe(0.5)
    })
  })

  describe('mass conversions', () => {
    it('converts between grams and kilograms', () => {
      expect(convert(1000, 'g', 'kg')).toBe(1)
      expect(convert(1, 'kg', 'g')).toBe(1000)
      expect(convert(500, 'g', 'kg')).toBe(0.5)
    })

    it('converts between ounces and pounds', () => {
      expect(convert(16, 'oz', 'lb')).toBe(1)
      expect(convert(1, 'lb', 'oz')).toBe(16)
      expect(convert(8, 'oz', 'lb')).toBe(0.5)
    })
  })

  describe('same unit conversions', () => {
    it('returns the same quantity for same units', () => {
      expect(convert(2, 'cup', 'cup')).toBe(2)
      expect(convert(1.5, 'tsp', 'tsp')).toBe(1.5)
      expect(convert(100, 'g', 'g')).toBe(100)
    })
  })

  describe('non-convertible units', () => {
    it('returns null for non-convertible units', () => {
      expect(convert(1, 'cup', 'g')).toBeNull()
      expect(convert(1, 'g', 'cup')).toBeNull()
      expect(convert(1, 'tsp', 'lb')).toBeNull()
      expect(convert(1, 'clove', 'cup')).toBeNull()
      expect(convert(1, 'can', 'g')).toBeNull()
    })
  })

  describe('edge cases', () => {
    it('handles zero quantities', () => {
      expect(convert(0, 'cup', 'tbsp')).toBe(0)
      expect(convert(0, 'g', 'kg')).toBe(0)
    })

    it('handles negative quantities', () => {
      expect(convert(-1, 'cup', 'tbsp')).toBe(-16)
      expect(convert(-2, 'tsp', 'tbsp')).toBe(-2/3)
    })

    it('handles very small quantities', () => {
      expect(convert(0.001, 'cup', 'tsp')).toBeCloseTo(0.048, 3)
      expect(convert(0.1, 'tsp', 'tbsp')).toBeCloseTo(0.033, 3)
    })

    it('handles very large quantities', () => {
      expect(convert(1000, 'cup', 'tbsp')).toBe(16000)
      expect(convert(1000, 'tbsp', 'cup')).toBe(62.5)
    })
  })

  describe('unit aliases', () => {
    it('handles common unit aliases', () => {
      expect(convert(1, 'tablespoon', 'tbsp')).toBe(1)
      expect(convert(1, 'tbsp', 'tablespoon')).toBe(1)
      expect(convert(1, 'teaspoon', 'tsp')).toBe(1)
      expect(convert(1, 'tsp', 'teaspoon')).toBe(1)
      expect(convert(1, 'fluid ounce', 'fl-oz')).toBe(1)
      expect(convert(1, 'fl-oz', 'fluid ounce')).toBe(1)
    })
  })

  describe('precision handling', () => {
    it('maintains reasonable precision for common conversions', () => {
      const result = convert(1, 'cup', 'tsp')
      expect(result).toBe(48)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('handles fractional results appropriately', () => {
      const result = convert(1, 'tsp', 'tbsp')
      expect(result).toBeCloseTo(1/3, 3)
    })
  })
})
