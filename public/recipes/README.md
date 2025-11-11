# Public Recipes

This folder contains recipe files that are automatically loaded by Grocery Buddy when the app starts. These recipes are part of the git repository and will be available to anyone who clones the project.

## Adding a New Recipe

### On Mac (Using Finder)

1. **Open Finder** and navigate to this folder:
   - Go to your Grocery Buddy project folder
   - Open `public` → `recipes`
   
2. **Create a new `.txt` file** in this folder:
   - Right-click in the folder
   - Select "New Document" → "Text Document" (or use your text editor)
   - Name it something like `my-recipe.txt`
   - Open it and paste your recipe following the standard format:
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

3. **Add the filename to `recipes.json`**:
   - Open `recipes.json` in this folder (using any text editor)
   - Add your filename to the array:
   ```json
   [
     "chili.txt",
     "pancakes.txt",
     "spaghetti.txt",
     "my-recipe.txt"
   ]
   ```
   - Save the file

4. **Restart the development server** (if it's running):
   - Stop the server (press `Ctrl+C` in the terminal)
   - Run `npm run dev` again
   - Refresh your browser - The recipe will automatically appear!

### Using Terminal (Alternative)

If you prefer using the command line:

```bash
# Navigate to the recipes folder
cd ~/Projects/grocery-buddy/public/recipes

# Create a new recipe file (using your preferred editor)
nano my-recipe.txt
# or
code my-recipe.txt
# or
open -a TextEdit my-recipe.txt

# Edit recipes.json to add your filename
nano recipes.json
# Add "my-recipe.txt" to the array
```

## Recipe Format

- **Title**: Required - Recipe name
- **Servings**: Optional - Number of servings (number only)
- **Tags**: Optional - Comma-separated tags (lowercase recommended)
- **Ingredients**: Required - List items starting with `-`
- **Instructions**: Required - Numbered steps (1., 2., 3., etc.)

## Examples

See the existing `.txt` files in this folder for examples of properly formatted recipes:
- `chili.txt` - Classic chili recipe
- `pancakes.txt` - Fluffy pancake recipe
- `spaghetti.txt` - Spaghetti carbonara recipe

## Notes

- Recipes in this folder are **public** and will be part of the git repository
- They're automatically loaded when the app starts
- Once loaded, they're stored in the browser's database and persist across sessions
- If you update a recipe file, restart the app to see changes
- Recipe filenames should be lowercase with hyphens (e.g., `my-favorite-recipe.txt`)

