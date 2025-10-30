export type Category = 'Produce' | 'Meat' | 'Dairy' | 'Canned' | 'Baking' | 'Other'

const mapping: Array<{ keyword: string; category: Category }> = [
  { keyword: 'onion', category: 'Produce' },
  { keyword: 'garlic', category: 'Produce' },
  { keyword: 'tomato', category: 'Produce' },
  { keyword: 'cilantro', category: 'Produce' },
  { keyword: 'beef', category: 'Meat' },
  { keyword: 'chicken', category: 'Meat' },
  { keyword: 'pork', category: 'Meat' },
  { keyword: 'milk', category: 'Dairy' },
  { keyword: 'cheese', category: 'Dairy' },
  { keyword: 'butter', category: 'Dairy' },
  { keyword: 'can', category: 'Canned' },
  { keyword: 'canned', category: 'Canned' },
  { keyword: 'flour', category: 'Baking' },
  { keyword: 'sugar', category: 'Baking' },
]

export function categorize(name: string): Category {
  const lower = name.toLowerCase()
  for (const { keyword, category } of mapping) {
    if (lower.includes(keyword)) return category
  }
  return 'Other'
} 