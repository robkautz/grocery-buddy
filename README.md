# Grocery Buddy

Your personal recipe manager and grocery list generator. Upload recipes, select dishes, and automatically generate organized grocery lists.

## Features

- 📝 **Simple Recipe Management**: Add recipes by copying `.txt` files to the `public/recipes/` folder - they load automatically!
- 🎯 **Smart Selection**: Choose dishes and adjust serving sizes
- 🛒 **Grocery Lists**: Automatically generate organized shopping lists
- 📱 **Responsive Design**: Works great on desktop and mobile

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

**❌ Problem**: Recipe not appearing after adding file
- **Solution**: Make sure the file ends with `.txt` and is in the `public/recipes/` folder
- **Solution**: Restart the dev server (`npm run dev`) to regenerate the manifest
- **Solution**: Refresh your browser

### Adding Recipes

Grocery Buddy automatically loads recipes from the `public/recipes/` folder. Just add a `.txt` file and it will appear automatically!

#### How to Add Recipes

1. **Navigate to the recipes folder**:
   - Open your Grocery Buddy project folder
   - Go to `public/recipes/`
   
   **Or use Terminal**:
   ```bash
   cd ~/Projects/grocery-buddy/public/recipes
   ```

2. **Create a new recipe file** (e.g., `my-recipe.txt`) following the recipe format:
   ```
   Title: My Recipe Name
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

3. **That's it!** The recipe manifest is automatically generated when you run `npm run dev` or `npm run build`. Just refresh your browser and the new recipe will appear!

#### Recipe File Format

Recipes must follow this format (see `public/recipes/_meta/template.txt` for a template):

- **Title**: Required - The recipe name
- **Servings**: Optional - Number of servings
- **Tags**: Optional - Comma-separated tags
- **Ingredients**: Required - List with dashes (-)
- **Instructions**: Required - Numbered steps

#### Example Recipe Files

Check the `public/recipes/` folder for examples:
- `chili.txt` - Classic chili recipe
- `pancakes.txt` - Fluffy pancake recipe
- `spaghetti.txt` - Spaghetti carbonara recipe

**Note**: Recipes in the `public/recipes/` folder are automatically loaded when the app starts. The recipe manifest (`recipes.json`) is automatically generated - you don't need to edit it manually!

### Converting Recipes with AI

Want to quickly convert recipes from websites or cookbooks? Use ChatGPT!

1. Copy the prompt from `docs/chatgpt-prompt.txt`
2. Paste it into ChatGPT
3. Add your recipe at the end
4. Copy the output and save as a `.txt` file in the `public/recipes/` folder
5. Restart the dev server (`npm run dev`) - the recipe will appear automatically!

### Templates & Resources

**Recipe Template:**
- `public/recipes/_meta/template.txt` - Blank template with all sections

**ChatGPT Prompt:**
- `docs/chatgpt-prompt.txt` - Ready-to-use ChatGPT prompt for converting recipes

**Example Recipes:**
- Check the `public/recipes/` folder for example recipes (chili.txt, pancakes.txt, spaghetti.txt)
- See `public/recipes/_meta/README.md` for instructions on adding new recipes

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

- **[docs/SETUP.md](docs/SETUP.md)** - Detailed setup instructions
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Contribution guidelines
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment options and guides
- **[docs/chatgpt-prompt.txt](docs/chatgpt-prompt.txt)** - ChatGPT prompt for recipe conversion

## Contributing

We welcome contributions! Please see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- 📖 Check the [docs/SETUP.md](docs/SETUP.md) for setup issues
- 🐛 Report bugs via [GitHub Issues](https://github.com/robkautz/grocery-buddy/issues)
- 💡 Suggest features via [GitHub Discussions](https://github.com/robkautz/grocery-buddy/discussions)
