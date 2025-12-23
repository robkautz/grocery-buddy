export type Category = 'Produce' | 'Meat' | 'Dairy' | 'Canned' | 'Baking' | 'Other'

const mapping: Array<{ keyword: string; category: Category }> = [
  // =========================
  // PRODUCE
  // =========================
  { keyword: 'onion', category: 'Produce' },
  { keyword: 'garlic', category: 'Produce' },
  { keyword: 'tomato', category: 'Produce' },
  { keyword: 'cilantro', category: 'Produce' },
  { keyword: 'parsley', category: 'Produce' },
  { keyword: 'basil', category: 'Produce' },
  { keyword: 'thyme', category: 'Produce' },
  { keyword: 'rosemary', category: 'Produce' },
  { keyword: 'sage', category: 'Produce' },
  { keyword: 'mint', category: 'Produce' },
  { keyword: 'dill', category: 'Produce' },
  { keyword: 'chives', category: 'Produce' },
  { keyword: 'ginger', category: 'Produce' },
  { keyword: 'scallion', category: 'Produce' },
  { keyword: 'green onion', category: 'Produce' },
  { keyword: 'shallot', category: 'Produce' },

  { keyword: 'lemon', category: 'Produce' },
  { keyword: 'lime', category: 'Produce' },
  { keyword: 'orange', category: 'Produce' },
  { keyword: 'apple', category: 'Produce' },
  { keyword: 'banana', category: 'Produce' },
  { keyword: 'avocado', category: 'Produce' },
  { keyword: 'grape', category: 'Produce' },
  { keyword: 'strawberry', category: 'Produce' },
  { keyword: 'blueberry', category: 'Produce' },
  { keyword: 'raspberry', category: 'Produce' },
  { keyword: 'pineapple', category: 'Produce' },
  { keyword: 'mango', category: 'Produce' },

  { keyword: 'carrot', category: 'Produce' },
  { keyword: 'celery', category: 'Produce' },
  { keyword: 'potato', category: 'Produce' },
  { keyword: 'sweet potato', category: 'Produce' },
  { keyword: 'yam', category: 'Produce' },
  { keyword: 'broccoli', category: 'Produce' },
  { keyword: 'cauliflower', category: 'Produce' },
  { keyword: 'zucchini', category: 'Produce' },
  { keyword: 'cucumber', category: 'Produce' },
  { keyword: 'bell pepper', category: 'Produce' },
  { keyword: 'jalapeno', category: 'Produce' },
  { keyword: 'serrano', category: 'Produce' },
  { keyword: 'mushroom', category: 'Produce' },
  { keyword: 'spinach', category: 'Produce' },
  { keyword: 'kale', category: 'Produce' },
  { keyword: 'lettuce', category: 'Produce' },
  { keyword: 'arugula', category: 'Produce' },
  { keyword: 'cabbage', category: 'Produce' },
  { keyword: 'brussels sprout', category: 'Produce' },
  { keyword: 'green bean', category: 'Produce' },
  { keyword: 'asparagus', category: 'Produce' },
  { keyword: 'corn', category: 'Produce' },
  { keyword: 'eggplant', category: 'Produce' },
  { keyword: 'squash', category: 'Produce' },
  { keyword: 'butternut squash', category: 'Produce' },
  { keyword: 'pumpkin', category: 'Produce' },

  // =========================
  // MEAT (includes seafood)
  // =========================
  { keyword: 'beef', category: 'Meat' },
  { keyword: 'ground beef', category: 'Meat' },
  { keyword: 'steak', category: 'Meat' },
  { keyword: 'chicken', category: 'Meat' },
  { keyword: 'chicken breast', category: 'Meat' },
  { keyword: 'chicken thigh', category: 'Meat' },
  { keyword: 'pork', category: 'Meat' },
  { keyword: 'bacon', category: 'Meat' },
  { keyword: 'ham', category: 'Meat' },
  { keyword: 'sausage', category: 'Meat' },
  { keyword: 'italian sausage', category: 'Meat' },
  { keyword: 'turkey', category: 'Meat' },
  { keyword: 'ground turkey', category: 'Meat' },
  { keyword: 'lamb', category: 'Meat' },
  { keyword: 'veal', category: 'Meat' },

  // Seafood collapsed into Meat
  { keyword: 'salmon', category: 'Meat' },
  { keyword: 'tuna', category: 'Meat' },
  { keyword: 'shrimp', category: 'Meat' },
  { keyword: 'cod', category: 'Meat' },
  { keyword: 'tilapia', category: 'Meat' },
  { keyword: 'crab', category: 'Meat' },
  { keyword: 'lobster', category: 'Meat' },
  { keyword: 'scallop', category: 'Meat' },
  { keyword: 'anchovy', category: 'Meat' },

  // =========================
  // DAIRY (includes eggs)
  // =========================
  { keyword: 'milk', category: 'Dairy' },
  { keyword: 'whole milk', category: 'Dairy' },
  { keyword: 'skim milk', category: 'Dairy' },
  { keyword: 'half and half', category: 'Dairy' },
  { keyword: 'heavy cream', category: 'Dairy' },
  { keyword: 'whipping cream', category: 'Dairy' },

  { keyword: 'cheese', category: 'Dairy' },
  { keyword: 'cheddar', category: 'Dairy' },
  { keyword: 'mozzarella', category: 'Dairy' },
  { keyword: 'parmesan', category: 'Dairy' },
  { keyword: 'feta', category: 'Dairy' },
  { keyword: 'goat cheese', category: 'Dairy' },
  { keyword: 'cream cheese', category: 'Dairy' },
  { keyword: 'ricotta', category: 'Dairy' },

  { keyword: 'butter', category: 'Dairy' },
  { keyword: 'yogurt', category: 'Dairy' },
  { keyword: 'greek yogurt', category: 'Dairy' },
  { keyword: 'sour cream', category: 'Dairy' },

  // Eggs collapsed into Dairy
  { keyword: 'egg', category: 'Dairy' },
  { keyword: 'eggs', category: 'Dairy' },

  // =========================
  // CANNED
  // =========================
  { keyword: 'canned', category: 'Canned' },
  { keyword: 'canned tomato', category: 'Canned' },
  { keyword: 'tomato sauce', category: 'Canned' },
  { keyword: 'tomato paste', category: 'Canned' },
  { keyword: 'crushed tomato', category: 'Canned' },
  { keyword: 'diced tomato', category: 'Canned' },
  { keyword: 'beans', category: 'Canned' },
  { keyword: 'black bean', category: 'Canned' },
  { keyword: 'kidney bean', category: 'Canned' },
  { keyword: 'chickpea', category: 'Canned' },
  { keyword: 'garbanzo bean', category: 'Canned' },
  { keyword: 'canned corn', category: 'Canned' },
  { keyword: 'broth', category: 'Canned' },
  { keyword: 'stock', category: 'Canned' },
  { keyword: 'chicken broth', category: 'Canned' },
  { keyword: 'beef broth', category: 'Canned' },
  { keyword: 'vegetable broth', category: 'Canned' },

  // =========================
  // BAKING (includes pantry/condiments + spices + dry goods + pasta/grains)
  // =========================
  { keyword: 'flour', category: 'Baking' },
  { keyword: 'all purpose flour', category: 'Baking' },
  { keyword: 'bread flour', category: 'Baking' },
  { keyword: 'cake flour', category: 'Baking' },
  { keyword: 'cornstarch', category: 'Baking' },

  { keyword: 'sugar', category: 'Baking' },
  { keyword: 'brown sugar', category: 'Baking' },
  { keyword: 'powdered sugar', category: 'Baking' },
  { keyword: 'baking powder', category: 'Baking' },
  { keyword: 'baking soda', category: 'Baking' },
  { keyword: 'yeast', category: 'Baking' },
  { keyword: 'vanilla extract', category: 'Baking' },
  { keyword: 'cocoa powder', category: 'Baking' },
  { keyword: 'chocolate chip', category: 'Baking' },

  // Pantry / condiments collapsed into Baking
  { keyword: 'ketchup', category: 'Baking' },
  { keyword: 'mustard', category: 'Baking' },
  { keyword: 'mayonnaise', category: 'Baking' },
  { keyword: 'soy sauce', category: 'Baking' },
  { keyword: 'hot sauce', category: 'Baking' },
  { keyword: 'bbq sauce', category: 'Baking' },
  { keyword: 'worcestershire', category: 'Baking' },
  { keyword: 'vinegar', category: 'Baking' },
  { keyword: 'white vinegar', category: 'Baking' },
  { keyword: 'apple cider vinegar', category: 'Baking' },
  { keyword: 'balsamic vinegar', category: 'Baking' },
  { keyword: 'rice vinegar', category: 'Baking' },
  { keyword: 'olive oil', category: 'Baking' },
  { keyword: 'vegetable oil', category: 'Baking' },
  { keyword: 'canola oil', category: 'Baking' },
  { keyword: 'sesame oil', category: 'Baking' },
  { keyword: 'honey', category: 'Baking' },
  { keyword: 'maple syrup', category: 'Baking' },
  { keyword: 'peanut butter', category: 'Baking' },
  { keyword: 'jam', category: 'Baking' },
  { keyword: 'jelly', category: 'Baking' },
  { keyword: 'salsa', category: 'Baking' },
  { keyword: 'pickles', category: 'Baking' },
  { keyword: 'relish', category: 'Baking' },

  // Spices collapsed into Baking
  { keyword: 'salt', category: 'Baking' },
  { keyword: 'kosher salt', category: 'Baking' },
  { keyword: 'sea salt', category: 'Baking' },
  { keyword: 'black pepper', category: 'Baking' },
  { keyword: 'peppercorn', category: 'Baking' },
  { keyword: 'paprika', category: 'Baking' },
  { keyword: 'smoked paprika', category: 'Baking' },
  { keyword: 'cumin', category: 'Baking' },
  { keyword: 'chili powder', category: 'Baking' },
  { keyword: 'cayenne', category: 'Baking' },
  { keyword: 'oregano', category: 'Baking' },
  { keyword: 'italian seasoning', category: 'Baking' },
  { keyword: 'garlic powder', category: 'Baking' },
  { keyword: 'onion powder', category: 'Baking' },
  { keyword: 'cinnamon', category: 'Baking' },
  { keyword: 'nutmeg', category: 'Baking' },
  { keyword: 'clove', category: 'Baking' },
  { keyword: 'ginger powder', category: 'Baking' },

  // Dry goods collapsed into Baking
  { keyword: 'breadcrumb', category: 'Baking' },
  { keyword: 'breadcrumbs', category: 'Baking' },
  { keyword: 'panko', category: 'Baking' },

  // Pasta / grains collapsed into Baking
  { keyword: 'spaghetti', category: 'Baking' },
  { keyword: 'pasta', category: 'Baking' },
  { keyword: 'penne', category: 'Baking' },
  { keyword: 'fusilli', category: 'Baking' },
  { keyword: 'macaroni', category: 'Baking' },
  { keyword: 'noodle', category: 'Baking' },
  { keyword: 'rice', category: 'Baking' },
  { keyword: 'white rice', category: 'Baking' },
  { keyword: 'brown rice', category: 'Baking' },
  { keyword: 'quinoa', category: 'Baking' },
  { keyword: 'couscous', category: 'Baking' },
  { keyword: 'oat', category: 'Baking' },
  { keyword: 'oats', category: 'Baking' },

  // Bread-type items often function like pantry goods; still collapsed into Baking per your rules
  { keyword: 'bread', category: 'Baking' },
  { keyword: 'bagel', category: 'Baking' },
  { keyword: 'bun', category: 'Baking' },
  { keyword: 'tortilla', category: 'Baking' },
  { keyword: 'pita', category: 'Baking' },
]

export function categorize(name: string): Category {
  const lower = name.toLowerCase()
  for (const { keyword, category } of mapping) {
    if (lower.includes(keyword)) return category
  }
  return 'Other'
} 