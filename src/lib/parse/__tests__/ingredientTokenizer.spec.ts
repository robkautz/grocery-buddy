import { describe, it, expect } from 'vitest'
import { tokenizeIngredient } from '../ingredientTokenizer'

describe('tokenizeIngredient', () => {
  it('parses simple quantities and units', () => {
    expect(tokenizeIngredient('1 cup flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'flour'
    })

    expect(tokenizeIngredient('2 cups sugar')).toEqual({
      qty: 2,
      unit: 'cup',
      item: 'sugar'
    })

    expect(tokenizeIngredient('1 tsp salt')).toEqual({
      qty: 1,
      unit: 'tsp',
      item: 'salt'
    })
  })

  it('handles fractions', () => {
    expect(tokenizeIngredient('1/2 cup butter')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'butter'
    })

    expect(tokenizeIngredient('1/4 tsp pepper')).toEqual({
      qty: 0.25,
      unit: 'tsp',
      item: 'pepper'
    })

    expect(tokenizeIngredient('3/4 cup milk')).toEqual({
      qty: 0.75,
      unit: 'cup',
      item: 'milk'
    })
  })

  it('handles mixed numbers', () => {
    expect(tokenizeIngredient('1 1/2 cups flour')).toEqual({
      qty: 1.5,
      unit: 'cup',
      item: 'flour'
    })

    expect(tokenizeIngredient('2 1/4 cups sugar')).toEqual({
      qty: 2.25,
      unit: 'cup',
      item: 'sugar'
    })

    expect(tokenizeIngredient('3 3/4 cups water')).toEqual({
      qty: 3.75,
      unit: 'cup',
      item: 'water'
    })
  })

  it('handles decimal quantities', () => {
    expect(tokenizeIngredient('1.5 cups flour')).toEqual({
      qty: 1.5,
      unit: 'cup',
      item: 'flour'
    })

    expect(tokenizeIngredient('0.5 tsp salt')).toEqual({
      qty: 0.5,
      unit: 'tsp',
      item: 'salt'
    })
  })

  it('handles items without units', () => {
    expect(tokenizeIngredient('2 eggs')).toEqual({
      qty: 2,
      unit: undefined,
      item: 'eggs'
    })

    expect(tokenizeIngredient('1 onion')).toEqual({
      qty: 1,
      unit: undefined,
      item: 'onion'
    })

    expect(tokenizeIngredient('3 cloves garlic')).toEqual({
      qty: 3,
      unit: undefined,
      item: 'cloves garlic'
    })
  })

  it('handles complex ingredient names', () => {
    expect(tokenizeIngredient('1 cup all-purpose flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'all-purpose flour'
    })

    expect(tokenizeIngredient('2 tbsp extra virgin olive oil')).toEqual({
      qty: 2,
      unit: 'tbsp',
      item: 'extra virgin olive oil'
    })

    expect(tokenizeIngredient('1/2 cup packed brown sugar')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'packed brown sugar'
    })
  })

  it('handles ingredients with descriptors', () => {
    expect(tokenizeIngredient('1 cup butter, softened')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'butter, softened'
    })

    expect(tokenizeIngredient('2 large eggs, beaten')).toEqual({
      qty: 2,
      unit: undefined,
      item: 'large eggs, beaten'
    })

    expect(tokenizeIngredient('1/4 cup nuts, chopped')).toEqual({
      qty: 0.25,
      unit: 'cup',
      item: 'nuts, chopped'
    })
  })

  it('handles edge cases', () => {
    expect(tokenizeIngredient('flour')).toEqual({
      qty: undefined,
      unit: undefined,
      item: 'flour'
    })

    expect(tokenizeIngredient('1 cup')).toEqual({
      qty: 1,
      unit: 'cup',
      item: ''
    })

    expect(tokenizeIngredient('')).toEqual({
      qty: undefined,
      unit: undefined,
      item: ''
    })
  })

  it('handles various unit formats', () => {
    expect(tokenizeIngredient('1 tablespoon oil')).toEqual({
      qty: 1,
      unit: 'tablespoon',
      item: 'oil'
    })

    expect(tokenizeIngredient('2 teaspoons vanilla')).toEqual({
      qty: 2,
      unit: 'teaspoon',
      item: 'vanilla'
    })

    expect(tokenizeIngredient('1 pound ground beef')).toEqual({
      qty: 1,
      unit: 'pound',
      item: 'ground beef'
    })

    expect(tokenizeIngredient('500 grams flour')).toEqual({
      qty: 500,
      unit: 'gram',
      item: 'flour'
    })
  })

  it('handles ingredients with dashes and special characters', () => {
    expect(tokenizeIngredient('1 cup self-rising flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'self-rising flour'
    })

    expect(tokenizeIngredient('1/2 cup olive oil (extra virgin)')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'olive oil (extra virgin)'
    })
  })
})
