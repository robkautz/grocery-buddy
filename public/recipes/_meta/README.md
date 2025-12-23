# Recipes

This folder contains recipe files that are automatically loaded by Grocery Buddy when the app starts.

## Folder Structure

- **`recipes/`** - Public recipes committed to git (shared with anyone who clones the repo)
- **`recipes/private/`** - Private recipes (gitignored, not committed to git)
- **`recipes/_meta/`** - Documentation and templates (not loaded as recipes)

Both recipe folders work the same way - recipes are automatically loaded on app startup. The only difference is that private recipes stay local and are not shared via git.

## Adding a New Recipe

### Option 1: Via Filesystem (Recommended)

1. **Open Finder** and navigate to the recipes folder:
   - For **public recipes**: Go to your Grocery Buddy project folder → `public` → `recipes`
   - For **private recipes**: Go to your Grocery Buddy project folder → `public` → `recipes` → `private`
   
2. **Create a new `.txt` file** in the appropriate folder:
   - Right-click in the folder
   - Select "New Document" → "Text Document" (or use your text editor)
   - Name it something like `my-recipe.txt`
   - Open it and paste your recipe following the standard format (see `_meta/template.txt` for an example)

3. **Restart the development server** (if it's running):
   - Stop the server (press `Ctrl+C` in the terminal)
   - Run `npm run dev` again
   - The recipe manifest will be auto-generated and your recipe will appear!

**Note**: You don't need to edit `recipes.json` manually - it's automatically generated from all `.txt` files in the folder when you run `npm run dev` or `npm run build`.

### Option 2: Via Web App + Export

1. **Add recipe via web app** (paste or upload a file)
2. **Open the recipe** and click **"Export Recipe"** button
3. **Copy the downloaded file** to either:
   - `public/recipes/` for public recipes (committed to git)
   - `public/recipes/private/` for private recipes (gitignored)
4. **Restart the dev server** and refresh your browser

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

# Restart dev server - recipes.json will be auto-generated
```

## Recipe Format

- **Title**: Required - Recipe name
- **Servings**: Optional - Number of servings (number only)
- **Tags**: Optional - Comma-separated tags (lowercase recommended)
- **Ingredients**: Required - List items starting with `-`
- **Instructions**: Required - Numbered steps (1., 2., 3., etc.)

See `_meta/template.txt` for a complete example.

## Examples

See the existing `.txt` files in the recipes folder for examples of properly formatted recipes:
- `chili.txt` - Classic chili recipe
- `pancakes.txt` - Fluffy pancake recipe
- `spaghetti.txt` - Spaghetti carbonara recipe

## Notes

- **Public recipes** (`recipes/`) are committed to git and shared with anyone who clones the repo
- **Private recipes** (`recipes/private/`) are gitignored and stay local to your machine
- Both types of recipes are automatically loaded when the app starts
- The `recipes.json` manifest is **auto-generated** - you don't need to maintain it manually
- Once loaded, recipes are cached in the browser's localStorage for performance
- If you update a recipe file, restart the app to see changes
- Recipe filenames should be lowercase with hyphens (e.g., `my-favorite-recipe.txt`)
- Recipes added via the web app are stored in localStorage until you export them to a file
- Non-recipe files (README, templates) are kept in the `_meta/` subfolder
