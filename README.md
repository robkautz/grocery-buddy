# Grocery Buddy

Your personal recipe manager and grocery list generator. Upload recipes, select dishes, and automatically generate organized grocery lists.

## Features

- 📝 **Recipe Management**: Upload and store recipes in plain text format
- 🎯 **Smart Selection**: Choose dishes and adjust serving sizes
- 🛒 **Grocery Lists**: Automatically generate organized shopping lists
- 📱 **Responsive Design**: Works great on desktop and mobile
- 💾 **Local Storage**: All data stored locally in your browser

## Quick Start

### Prerequisites
- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/robkautz/grocery-buddy.git
   cd grocery-buddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with UI

### Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. You can serve them with any static file server or deploy to platforms like Vercel, Netlify, or GitHub Pages.

### Deployment Options

**Vercel:**
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

**Netlify:**
1. Push to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

**GitHub Pages:**
1. Run `npm run build`
2. Push `dist/` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Recipe Text Format

Recipes should be uploaded as plain text files (`.txt`) with the following structure:

### Required Sections

- **Title**: The name of the recipe
- **Ingredients**: List of ingredients with quantities and units
- **Instructions**: Step-by-step cooking instructions

### Optional Sections

- **Servings**: Number of servings the recipe makes
- **Tags**: Comma-separated tags for categorization

### Format Example

```
Title: Classic Chili
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
4. Stir in beef broth and tomato paste
5. Bring to a boil, then reduce heat and simmer for 30 minutes
6. Taste and adjust seasonings as needed
7. Serve hot with your favorite toppings
```

### Ingredient Format Guidelines

- **Quantities**: Use numbers, fractions (1/2, 1/4), or mixed numbers (1 1/2)
- **Units**: Common units like cup, tbsp, tsp, lb, oz, g, ml, etc.
- **Items**: Ingredient names with optional descriptors (e.g., "onion, diced")

### Common Issues and Solutions

**❌ Problem**: Recipe not parsing correctly
- **Solution**: Ensure section headers are on their own lines
- **Solution**: Use dashes (-) for ingredient lists
- **Solution**: Use numbers (1., 2., 3.) for instructions

**❌ Problem**: Ingredients not recognized
- **Solution**: Include quantities and units (e.g., "1 cup flour" not just "flour")
- **Solution**: Use standard units (cup, tbsp, tsp, lb, oz, g, ml)

**❌ Problem**: Servings not detected
- **Solution**: Use format "Servings: 4" (number only)
- **Solution**: Place on its own line

**❌ Problem**: Upload functionality not working
- **Solution**: Use the manual recipe addition method below

### Manually Adding Recipes (If Upload Doesn't Work)

If the upload tool isn't working, you can add recipes manually using your browser's developer console:

#### Method 1: Using Browser Console (Recommended)

1. **Open Grocery Buddy** in your browser (make sure the app is fully loaded)
2. **Open Developer Console**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari: Enable Developer menu first, then `Cmd+Option+C`
3. **Go to the Console tab**
4. **Load the helper script** - You have two options:
   
   **Option A: Copy from file** (Easier)
   - Open the file `examples/manual-add-recipe.js` in a text editor
   - Copy the entire contents
   - Paste into the browser console and press Enter
   
   **Option B: Use the function directly** - Paste this code:

```javascript
// Helper function to add a recipe manually using the app's store
async function addRecipeManually(recipeText) {
  // Access the store (exposed on window for debugging)
  const store = window.__groceryBuddyStore;
  if (!store) {
    console.error('Store not found. Make sure the app is loaded.');
    return null;
  }
  
  // Parse the recipe text manually (simplified parser)
  const lines = recipeText.split('\n').map(l => l.trim()).filter(l => l);
  let title = '';
  let servings = undefined;
  let tags = [];
  let ingredients = [];
  let instructions = [];
  let currentSection = '';
  
  for (const line of lines) {
    if (line.startsWith('Title:')) {
      title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Servings:')) {
      const match = line.match(/\d+/);
      if (match) servings = parseInt(match[0]);
    } else if (line.startsWith('Tags:')) {
      tags = line.replace('Tags:', '').split(',').map(t => t.trim().toLowerCase()).filter(t => t);
    } else if (line.toLowerCase() === 'ingredients:') {
      currentSection = 'ingredients';
    } else if (line.toLowerCase() === 'instructions:') {
      currentSection = 'instructions';
    } else if (currentSection === 'ingredients' && line.startsWith('-')) {
      const ing = line.replace('-', '').trim();
      // Simple parsing - you can enhance this
      const match = ing.match(/^(\d+(?:\s+\d+\/\d+)?(?:\s+\d+\/\d+)?)\s+(\w+)\s+(.+)$/);
      if (match) {
        ingredients.push({ item: match[3], qty: parseFloat(match[1]), unit: match[2] });
      } else {
        ingredients.push({ item: ing });
      }
    } else if (currentSection === 'instructions' && /^\d+\./.test(line)) {
      instructions.push(line.replace(/^\d+\.\s*/, ''));
    }
  }
  
  if (!title) {
    console.error('Recipe must have a title');
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
    console.log('✅ Recipe added successfully! Refresh the page to see it.');
    return recipe;
  } catch (error) {
    console.error('Error adding recipe:', error);
    return null;
  }
}

// Example usage:
const recipeText = `Title: Classic Chili
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

// Run: await addRecipeManually(recipeText);
```

5. **Create your recipe text** following this format:
   ```
   Title: Your Recipe Name
   Servings: 4
   Tags: dinner, easy
   
   Ingredients:
   - 1 cup flour
   - 2 eggs
   - 1 tsp salt
   
   Instructions:
   1. First step
   2. Second step
   3. Final step
   ```

6. **Add your recipe** by calling:
   ```javascript
   await addRecipeManually(`Title: Your Recipe Name
   Servings: 4
   Tags: dinner, easy
   
   Ingredients:
   - 1 cup flour
   - 2 eggs
   
   Instructions:
   1. Mix ingredients
   2. Cook and serve`);
   ```

7. **Refresh the page** to see your recipe in the list

**Tip**: You can also define your recipe as a variable first:
```javascript
const myRecipe = `Title: My Recipe
...`;
await addRecipeManually(myRecipe);
```

#### Method 2: Direct IndexedDB Access

If Method 1 doesn't work, you can add recipes directly to IndexedDB:

```javascript
// Open IndexedDB
const request = indexedDB.open('grocery-buddy', 1);

request.onsuccess = async (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['recipes'], 'readwrite');
  const store = transaction.objectStore('recipes');
  
  const recipe = {
    id: crypto.randomUUID(),
    title: 'My Recipe',
    servings: 4,
    tags: ['dinner', 'easy'],
    ingredients: [
      { item: 'chicken', qty: 1, unit: 'lb' },
      { item: 'onion', qty: 1, note: 'diced' }
    ],
    instructions: [
      'Cook the chicken',
      'Add the onion',
      'Serve hot'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await store.put(recipe);
  console.log('Recipe added! Refresh the page.');
};
```

**Note**: After adding recipes manually, refresh the page to see them in the app.

### Converting Recipes with AI

Want to quickly convert recipes from websites or cookbooks? Use ChatGPT!

1. Copy the prompt from `examples/chatgpt-prompt.txt`
2. Paste it into ChatGPT
3. Add your recipe at the end
4. Copy the output and save as a `.txt` file
5. Upload it to Grocery Buddy!

### Example Recipes & Templates

Check the `examples/` directory for files:
- `template.txt` - Blank template with all sections
- `chatgpt-prompt.txt` - Ready-to-use ChatGPT prompt
- `manual-add-recipe.js` - Helper script for manually adding recipes via console
- `chili.txt` - Classic chili recipe
- `pancakes.txt` - Fluffy pancake recipe  
- `spaghetti.txt` - Spaghetti carbonara recipe

## Development

This project is built with:
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (coming soon)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── state/         # State management
├── services/      # API and data services
├── types/         # TypeScript type definitions
├── schemas/       # Data validation schemas
└── lib/           # Utility functions
```

## Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment options and guides

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- 📖 Check the [SETUP.md](SETUP.md) for setup issues
- 🐛 Report bugs via [GitHub Issues](https://github.com/robkautz/grocery-buddy/issues)
- 💡 Suggest features via [GitHub Discussions](https://github.com/robkautz/grocery-buddy/discussions)
