# Public Recipes

This folder contains recipe files that are automatically loaded by Grocery Buddy when the app starts.

## Adding a New Recipe

1. **Create a new `.txt` file** in this folder with your recipe following the standard format:
   ```
   Title: Recipe Name
   Servings: 4
   Tags: dinner, easy
   
   Ingredients:
   - 1 cup ingredient
   - 2 tbsp another ingredient
   
   Instructions:
   1. First step
   2. Second step
   ```

2. **Add the filename to `recipes.json`**:
   ```json
   [
     "chili.txt",
     "pancakes.txt",
     "spaghetti.txt",
     "your-new-recipe.txt"
   ]
   ```

3. **Restart the app** - The recipe will be automatically loaded!

## Recipe Format

- **Title**: Required - Recipe name
- **Servings**: Optional - Number of servings (number only)
- **Tags**: Optional - Comma-separated tags (lowercase recommended)
- **Ingredients**: Required - List items starting with `-`
- **Instructions**: Required - Numbered steps (1., 2., 3., etc.)

## Examples

See the existing `.txt` files in this folder for examples of properly formatted recipes.

