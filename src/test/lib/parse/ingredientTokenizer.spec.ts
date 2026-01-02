import { describe, it, expect } from 'vitest'
import { tokenizeIngredientLine } from '@/lib/parse/ingredientTokenizer'

describe('tokenizeIngredientLine', () => {
  it('parses simple quantities and units', () => {
    expect(tokenizeIngredientLine('1 cup flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'flour'
    })

    expect(tokenizeIngredientLine('2 cups sugar')).toEqual({
      qty: 2,
      unit: 'cups',
      item: 'sugar'
    })

    expect(tokenizeIngredientLine('1 tsp salt')).toEqual({
      qty: 1,
      unit: 'tsp',
      item: 'salt'
    })
  })

  it('handles fractions', () => {
    expect(tokenizeIngredientLine('1/2 cup butter')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'butter'
    })

    expect(tokenizeIngredientLine('1/4 tsp pepper')).toEqual({
      qty: 0.25,
      unit: 'tsp',
      item: 'pepper'
    })

    expect(tokenizeIngredientLine('3/4 cup milk')).toEqual({
      qty: 0.75,
      unit: 'cup',
      item: 'milk'
    })
  })

  it('handles mixed numbers', () => {
    expect(tokenizeIngredientLine('1 1/2 cups flour')).toEqual({
      qty: 1.5,
      unit: 'cups',
      item: 'flour'
    })

    expect(tokenizeIngredientLine('2 1/4 cups sugar')).toEqual({
      qty: 2.25,
      unit: 'cups',
      item: 'sugar'
    })

    expect(tokenizeIngredientLine('3 3/4 cups water')).toEqual({
      qty: 3.75,
      unit: 'cups',
      item: 'water'
    })
  })

  it('handles decimal quantities', () => {
    expect(tokenizeIngredientLine('1.5 cups flour')).toEqual({
      qty: 1.5,
      unit: 'cups',
      item: 'flour'
    })

    expect(tokenizeIngredientLine('0.5 tsp salt')).toEqual({
      qty: 0.5,
      unit: 'tsp',
      item: 'salt'
    })
  })

  it('handles items without units', () => {
    expect(tokenizeIngredientLine('2 eggs')).toEqual({
      qty: 2,
      unit: undefined,
      item: 'eggs'
    })

    expect(tokenizeIngredientLine('1 onion')).toEqual({
      qty: 1,
      unit: undefined,
      item: 'onion'
    })

    expect(tokenizeIngredientLine('3 cloves garlic')).toEqual({
      qty: 3,
      unit: 'cloves',
      item: 'garlic'
    })
  })

  it('handles complex ingredient names', () => {
    expect(tokenizeIngredientLine('1 cup all-purpose flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'all-purpose flour'
    })

    expect(tokenizeIngredientLine('2 tbsp extra virgin olive oil')).toEqual({
      qty: 2,
      unit: 'tbsp',
      item: 'extra virgin olive oil'
    })

    expect(tokenizeIngredientLine('1/2 cup packed brown sugar')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'packed brown sugar'
    })
  })

  it('handles ingredients with descriptors', () => {
    expect(tokenizeIngredientLine('1 cup butter, softened')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'butter, softened'
    })

    expect(tokenizeIngredientLine('2 large eggs, beaten')).toEqual({
      qty: 2,
      unit: undefined,
      item: 'large eggs, beaten'
    })

    expect(tokenizeIngredientLine('1/4 cup nuts, chopped')).toEqual({
      qty: 0.25,
      unit: 'cup',
      item: 'nuts, chopped'
    })
  })

  it('handles edge cases', () => {
    expect(tokenizeIngredientLine('flour')).toEqual({
      qty: undefined,
      unit: undefined,
      item: 'flour'
    })

    expect(tokenizeIngredientLine('1 cup')).toEqual({
      qty: 1,
      unit: 'cup',
      item: ''
    })

    expect(tokenizeIngredientLine('')).toEqual({
      qty: undefined,
      unit: undefined,
      item: ''
    })
  })

  it('handles various unit formats', () => {
    expect(tokenizeIngredientLine('1 tablespoon oil')).toEqual({
      qty: 1,
      unit: 'tablespoon',
      item: 'oil'
    })

    expect(tokenizeIngredientLine('2 teaspoons vanilla')).toEqual({
      qty: 2,
      unit: 'teaspoons',
      item: 'vanilla'
    })

    expect(tokenizeIngredientLine('1 pound ground beef')).toEqual({
      qty: 1,
      unit: 'pound',
      item: 'ground beef'
    })

    expect(tokenizeIngredientLine('500 grams flour')).toEqual({
      qty: 500,
      unit: 'grams',
      item: 'flour'
    })
  })

  it('handles ingredients with dashes and special characters', () => {
    expect(tokenizeIngredientLine('1 cup self-rising flour')).toEqual({
      qty: 1,
      unit: 'cup',
      item: 'self-rising flour'
    })

    expect(tokenizeIngredientLine('1/2 cup olive oil (extra virgin)')).toEqual({
      qty: 0.5,
      unit: 'cup',
      item: 'olive oil (extra virgin)'
    })
  })

  it('handles "ribs" as a unit for celery', () => {
    expect(tokenizeIngredientLine('2 ribs of celery')).toEqual({
      qty: 2,
      unit: 'ribs',
      item: 'celery'
    })

    expect(tokenizeIngredientLine('3 ribs celery')).toEqual({
      qty: 3,
      unit: 'ribs',
      item: 'celery'
    })
  })
})
