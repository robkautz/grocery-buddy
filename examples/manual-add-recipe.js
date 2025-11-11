// Manual Recipe Addition Helper Script
// Copy and paste this entire script into your browser console when Grocery Buddy is open

// Helper function to add a recipe manually
async function addRecipeManually(recipeText) {
  // Access the store (exposed on window for debugging)
  const store = window.__groceryBuddyStore;
  if (!store) {
    console.error('❌ Store not found. Make sure Grocery Buddy is loaded and refresh the page.');
    return null;
  }
  
  // Parse the recipe text
  const lines = recipeText.split('\n').map(l => l.trim()).filter(l => l);
  let title = '';
  let servings = undefined;
  let tags = [];
  let ingredients = [];
  let instructions = [];
  let currentSection = '';
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if (lowerLine.startsWith('title:')) {
      title = line.substring(6).trim();
    } else if (lowerLine.startsWith('servings:')) {
      const match = line.match(/\d+/);
      if (match) servings = parseInt(match[0], 10);
    } else if (lowerLine.startsWith('tags:')) {
      const tagStr = line.substring(5).trim();
      tags = tagStr.split(',').map(t => t.trim().toLowerCase()).filter(t => t);
    } else if (lowerLine === 'ingredients:') {
      currentSection = 'ingredients';
    } else if (lowerLine === 'instructions:') {
      currentSection = 'instructions';
    } else if (currentSection === 'ingredients' && line.startsWith('-')) {
      const ingLine = line.substring(1).trim();
      // Try to parse quantity, unit, and item
      // Pattern: "1.5 cup flour" or "2 tbsp olive oil" or "1 medium onion, diced"
      const qtyMatch = ingLine.match(/^(\d+(?:\s+\d+\/\d+)?(?:\s+\d+\/\d+)?)\s+/);
      if (qtyMatch) {
        const qtyStr = qtyMatch[1].trim();
        const rest = ingLine.substring(qtyMatch[0].length).trim();
        // Try to match unit
        const unitMatch = rest.match(/^([a-z]+(?:\s+\([^)]+\))?)\s+(.+)$/i);
        if (unitMatch) {
          ingredients.push({
            item: unitMatch[2],
            qty: parseFloat(qtyStr.replace(/\s+/g, ' ').split(' ').reduce((a, b) => {
              if (b.includes('/')) {
                const [num, den] = b.split('/').map(Number);
                return a + (num / den);
              }
              return a + Number(b);
            }, 0)),
            unit: unitMatch[1],
            note: rest.includes(',') ? rest.split(',').slice(1).join(',').trim() : undefined
          });
        } else {
          // No unit, just quantity and item
          const itemParts = rest.split(',');
          ingredients.push({
            item: itemParts[0].trim(),
            qty: parseFloat(qtyStr.replace(/\s+/g, ' ').split(' ').reduce((a, b) => {
              if (b.includes('/')) {
                const [num, den] = b.split('/').map(Number);
                return a + (num / den);
              }
              return a + Number(b);
            }, 0)),
            note: itemParts.length > 1 ? itemParts.slice(1).join(',').trim() : undefined
          });
        }
      } else {
        // No quantity, just item
        const itemParts = ingLine.split(',');
        ingredients.push({
          item: itemParts[0].trim(),
          note: itemParts.length > 1 ? itemParts.slice(1).join(',').trim() : undefined
        });
      }
    } else if (currentSection === 'instructions') {
      // Remove leading numbers and dots
      const cleaned = line.replace(/^\d+[\.\)]\s*/, '').trim();
      if (cleaned) instructions.push(cleaned);
    }
  }
  
  if (!title) {
    console.error('❌ Recipe must have a title. Use format: Title: Your Recipe Name');
    return null;
  }
  
  // Create recipe object
  const recipe = {
    id: crypto.randomUUID ? crypto.randomUUID() : `r_${Math.random().toString(36).slice(2, 10)}`,
    title,
    servings,
    tags: tags.length > 0 ? tags : [],
    ingredients: ingredients.length > 0 ? ingredients : [],
    instructions: instructions.length > 0 ? instructions : [],
    sourceText: recipeText
  };
  
  // Add using the store's addRecipe method
  try {
    await store.getState().addRecipe(recipe);
    console.log('✅ Recipe "' + title + '" added successfully!');
    console.log('🔄 Refresh the page to see it in the recipe list.');
    return recipe;
  } catch (error) {
    console.error('❌ Error adding recipe:', error);
    return null;
  }
}

// Example usage - modify the recipeText below with your recipe
const exampleRecipe = `Title: Classic Chili
Servings: 6
Tags: dinner, comfort food, spicy

Ingredients:
- 1 lb ground beef
- 1 medium onion, diced
- 2 cloves garlic, minced
- 1 can (14.5 oz) diced tomatoes
- 1 can (15 oz) kidney beans, drained
- 2 tbsp chili powder
- 1 tsp cumin
- 1 tsp salt
- 1/2 tsp black pepper

Instructions:
1. Brown the ground beef in a large pot over medium-high heat
2. Add onion and garlic, cook until softened
3. Add diced tomatoes, beans, and seasonings
4. Bring to a boil, then reduce heat and simmer for 30 minutes
5. Serve hot with your favorite toppings`;

console.log('📝 Manual Recipe Addition Helper Loaded!');
console.log('Usage: await addRecipeManually(`Your recipe text here`)');
console.log('Example: await addRecipeManually(exampleRecipe)');

