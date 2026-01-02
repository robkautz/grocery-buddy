# Implementation Plan

## Project Initialization
- [ ] Step 1: Scaffold Vite + React + TypeScript project
  - **Task**: Initialize project and core files.
  - **Files**:
    - `package.json`: add scripts (`dev`, `build`, `test`, `lint`, `preview`)
    - `vite.config.ts`: default Vite config
    - `tsconfig.json`: TS config
    - `index.html`: root HTML with `lang`, `meta`
    - `src/main.tsx`: React root render
    - `src/App.tsx`: placeholder shell
    - `src/styles/globals.css`: base stylesheet (will integrate Tailwind next)
    - `.gitignore`: Node, build outputs
    - `README.md`: quickstart
  - **Step Dependencies**: None
  - **User Instructions**:
    ```bash
    npm create vite@latest grocery-buddy -- --template react-ts
    cd grocery-buddy
    npm i
    ```

- [ ] Step 2: Install & configure Tailwind CSS
  - **Task**: Add Tailwind and basic design tokens.
  - **Files**:
    - `tailwind.config.js`: content paths `./index.html`, `./src/**/*.{ts,tsx}`
    - `postcss.config.js`: Tailwind + autoprefixer
    - `src/styles/globals.css`: `@tailwind base; @tailwind components; @tailwind utilities;` plus CSS vars for spacing/typography
    - `src/App.tsx`: wrap content in responsive container classes
  - **Step Dependencies**: Step 1
  - **User Instructions**:
    ```bash
    npm i -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm run dev
    ```

- [ ] Step 3: Add core libraries & project structure
  - **Task**: Install libs and create folders.
  - **Files**:
    - (create folders) `src/pages/`, `src/components/`, `src/components/ui/`, `src/state/`, `src/db/`, `src/services/`, `src/lib/`, `src/lib/parse/`, `src/lib/units/`, `src/lib/aggregate/`, `src/schemas/`, `src/types/`, `src/styles/`
    - `src/components/NavTabs.tsx`: simple tabbed nav scaffold
    - `src/pages/RecipesPage.tsx`, `src/pages/SelectPage.tsx`, `src/pages/ListPage.tsx`: stubs
    - `src/App.tsx`: in-app tab switching (stateful, no router)
  - **Step Dependencies**: Steps 1–2
  - **User Instructions**:
    ```bash
    npm i zustand idb zod
    npm i -D @types/idb
    ```

## UI Building Blocks
- [ ] Step 4: UI primitives (Button, Input, Card, Badge)
  - **Task**: Create reusable styled components.
  - **Files**:
    - `src/components/ui/Button.tsx`: variants (primary, ghost)
    - `src/components/ui/Input.tsx`: text/file/number variants
    - `src/components/ui/Card.tsx`: card container
    - `src/components/ui/Badge.tsx`: small pill (for tags)
    - `src/styles/components.css`: shared utility classes (optional)
  - **Step Dependencies**: Step 3

## Types & Schemas
- [ ] Step 5: Define domain types & Zod schemas
  - **Task**: Establish core TS interfaces and runtime validators.
  - **Files**:
    - `src/types/recipe.ts`: `Recipe`, `Ingredient`, `ParsedRecipe`, `RecipeId`
    - `src/schemas/recipeSchema.ts`: Zod schemas for recipe & ingredient
  - **Step Dependencies**: Step 3

## Parsing Pipeline
- [ ] Step 6: Basic recipe text parser
  - **Task**: Parse plaintext sections: `Title:`, `Servings:`, `Tags:`, `Ingredients:`, `Instructions:`.
  - **Files**:
    - `src/lib/parse/recipeParser.ts`: orchestrates parse of sections
    - `src/lib/parse/parseUtils.ts`: helpers (section splitting, trimming)
  - **Step Dependencies**: Step 5

- [ ] Step 7: Ingredient tokenizer & quantity parsing
  - **Task**: Convert lines like `- 1 1/2 tbsp olive oil` → `{qty: 1.5, unit: 'tbsp', item: 'olive oil'}`. Handle fractions & mixed numbers.
  - **Files**:
    - `src/lib/parse/ingredientTokenizer.ts`: regex/tokenization, fraction to float
  - **Step Dependencies**: Step 6

- [ ] Step 8: Validation & error reporting
  - **Task**: Validate parser output with Zod and produce user-friendly errors with line references/suggestions.
  - **Files**:
    - `src/lib/parse/validators.ts`: wrap Zod, map issues to messages
    - `src/components/ParseResultAlert.tsx`: UI for parse errors/warnings
  - **Step Dependencies**: Steps 5–7

## IndexedDB Persistence
- [ ] Step 9: IndexedDB setup with `idb`
  - **Task**: Initialize DB with `recipes` store, versioning.
  - **Files**:
    - `src/db/types.ts`: DB types for `idb`
    - `src/db/index.ts`: `openDB`, schema v1 with `recipes` (key: id)
  - **Step Dependencies**: Step 3

- [ ] Step 10: Recipe service (CRUD)
  - **Task**: Encapsulate DB operations (add/getAll/update/delete/clear).
  - **Files**:
    - `src/services/recipeService.ts`: CRUD functions returning typed results
  - **Step Dependencies**: Step 9

## State Management
- [ ] Step 11: Zustand store (recipes + selection + ui)
  - **Task**: Two slices:
    - `recipesSlice`: list, add/update/delete, hydrate from DB
    - `selectionSlice`: selected recipe IDs, per-recipe serving multipliers, grocery list overrides
  - **Files**:
    - `src/state/store.ts`: combine slices
    - `src/state/recipesSlice.ts`: actions/selectors
    - `src/state/selectionSlice.ts`: actions/selectors
  - **Step Dependencies**: Steps 5, 10

## Recipe Management UI
- [ ] Step 12: Upload component (file input + drag/drop)
  - **Task**: Multi-file upload, parse each, show per-file success/errors, save valid recipes to DB/state.
  - **Files**:
    - `src/components/RecipeUpload.tsx`
    - `src/components/Dropzone.tsx` (optional simple DnD wrapper)
    - `src/pages/RecipesPage.tsx`: integrate uploader
  - **Step Dependencies**: Steps 6–11

- [ ] Step 13: Recipes list with search & tag filters
  - **Task**: Display stored recipes; search by title; tag chips for filtering.
  - **Files**:
    - `src/components/SearchBar.tsx`
    - `src/components/TagFilter.tsx`
    - `src/components/RecipeCard.tsx`
    - `src/pages/RecipesPage.tsx`: list + filters integration
  - **Step Dependencies**: Step 11

- [ ] Step 14: View details, delete, and clear-all
  - **Task**: Show recipe details in modal (title/servings/ingredients/instructions). Delete individual recipe. Clear all recipes.
  - **Files**:
    - `src/components/RecipeDetailModal.tsx`
    - `src/pages/RecipesPage.tsx`: add actions (delete/clear)
  - **Step Dependencies**: Steps 10–13

## Dish Selection Flow
- [ ] Step 15: Select page with selectable recipe cards
  - **Task**: Grid of recipes with checkbox/toggle; selected state stored in `selectionSlice`.
  - **Files**:
    - `src/pages/SelectPage.tsx`
    - `src/components/SelectableRecipeCard.tsx`
  - **Step Dependencies**: Steps 11, 13

- [ ] Step 16: Serving multiplier per selected dish
  - **Task**: Input/stepper for multiplier (default 1). Show base servings and computed servings.
  - **Files**:
    - `src/components/ServingMultiplier.tsx`
    - `src/pages/SelectPage.tsx`: render multiplier for selected items
    - `src/state/selectionSlice.ts`: add/update multiplier actions
  - **Step Dependencies**: Step 15

## Units & Aggregation
- [ ] Step 17: Unit definitions and conversion helpers
  - **Task**: Canonical unit set + alias mapping + conversion factors (tsp↔tbsp↔cup, fl-oz↔cup, g↔kg, oz↔lb, ml↔l). Non-convertible units (e.g., “clove”, “can”) handled as discrete “count” units.
  - **Files**:
    - `src/lib/units/units.ts`: enums, alias map
    - `src/lib/units/convert.ts`: `convert(qty, from, to)`
  - **Step Dependencies**: Step 7

- [ ] Step 18: Ingredient canonicalization & normalization
  - **Task**: Normalize names (case, trim descriptors like “chopped” → notes), unify units to canonical types (volume, mass, count).
  - **Files**:
    - `src/lib/units/normalize.ts`: `normalizeIngredient(i) → {name, unit, qty, note}`
  - **Step Dependencies**: Step 17

- [ ] Step 19: Scale by servings & aggregate duplicates
  - **Task**: For each selected recipe, scale ingredients by multiplier; merge by `(canonicalName, canonicalUnit)`; sum quantities.
  - **Files**:
    - `src/lib/aggregate/scaleAndAggregate.ts`: main function
  - **Step Dependencies**: Steps 16–18

- [ ] Step 20: Store-friendly rounding (packages)
  - **Task**: Round aggregates to “store pack” sizes (e.g., cans near 14–15 oz → 1 can; ground beef to nearest 1 lb; eggs to 12s). Provide config for future tuning.
  - **Files**:
    - `src/lib/aggregate/packsConfig.ts`: default mappings/thresholds
    - `src/lib/aggregate/roundToStorePacks.ts`: apply rounding rules
  - **Step Dependencies**: Step 19

## Grocery List UI & Interactions
- [ ] Step 21: List page (render aggregated items)
  - **Task**: Generate list from selection; optional simple categorization (Produce, Meat, Dairy, Canned, Baking, Other) via keyword map.
  - **Files**:
    - `src/lib/aggregate/categories.ts`: keyword → category map
    - `src/pages/ListPage.tsx`: compute & render grouped list
  - **Step Dependencies**: Steps 19–20

- [ ] Step 22: “Already have” toggles & inline edits
  - **Task**: Add checkbox per item; gray out owned items. Allow inline edit of name/qty/unit with local override (non-destructive).
  - **Files**:
    - `src/components/GroceryItemRow.tsx`
    - `src/state/selectionSlice.ts`: store overrides & owned flags
    - `src/pages/ListPage.tsx`: integrate
  - **Step Dependencies**: Step 21

- [ ] Step 23: Copy & print
  - **Task**: Copy list as plaintext (with categories); print-friendly stylesheet and “Print” button.
  - **Files**:
    - `src/lib/utils/formatListAsText.ts`: convert list → text
    - `src/lib/utils/clipboard.ts`: copy helper
    - `src/styles/print.css`: print view tweaks
    - `src/pages/ListPage.tsx`: add buttons
  - **Step Dependencies**: Step 21

## App Lifecycle & Persistence
- [ ] Step 24: Hydrate state on startup + loading states
  - **Task**: On app mount, load recipes from DB; show spinner while loading; empty state if none.
  - **Files**:
    - `src/components/Loading.tsx`: spinner
    - `src/App.tsx`: `useEffect` to hydrate recipes
  - **Step Dependencies**: Steps 10–11

- [ ] Step 25: DB migrations (versioning)
  - **Task**: Set up future-proof migration hooks for IndexedDB schema updates.
  - **Files**:
    - `src/db/migrations.ts`: placeholder + example v1→v2
    - `src/db/index.ts`: wire migration dispatcher
  - **Step Dependencies**: Step 9

## UX, Accessibility, Polish
- [ ] Step 26: Responsive/mobile polish & a11y
  - **Task**: Ensure mobile grid, large touch targets, keyboard nav, ARIA roles for lists/dialogs/toggles.
  - **Files**:
    - `src/styles/globals.css`: focus ring utilities
    - `src/components/**/*.tsx`: add `role`, `aria-checked`, `aria-expanded`, `tabIndex` as needed
  - **Step Dependencies**: Steps 12–23

- [ ] Step 27: Transitions & micro-interactions
  - **Task**: Add CSS transitions for tab changes, modal open/close, list item toggles.
  - **Files**:
    - `src/styles/globals.css`: transition utilities
    - `src/components/*`: class updates for transitions
  - **Step Dependencies**: Step 26

- [ ] Step 28: Empty states & error banners
  - **Task**: Friendly empty states for each page; top-level error banner component for parse/DB errors.
  - **Files**:
    - `src/components/EmptyState.tsx`
    - `src/components/Alert.tsx`
    - `src/pages/*.tsx`: integrate
  - **Step Dependencies**: Steps 12–24

## Testing
- [ ] Step 29: Configure Vitest + Testing Library
  - **Task**: Set up unit/integration testing with JSDOM.
  - **Files**:
    - `vitest.config.ts`: jsdom env
    - `src/test/setup.ts`: `@testing-library/jest-dom` setup
    - `src/test/utils.tsx`: custom `render` with providers
  - **Step Dependencies**: Step 1
  - **User Instructions**:
    ```bash
    npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
    ```

- [ ] Step 30: Parser & units unit tests
  - **Task**: Tests for `recipeParser`, `ingredientTokenizer`, `convert`, `normalize`.
  - **Files**:
    - `src/lib/parse/__tests__/recipeParser.spec.ts`
    - `src/lib/parse/__tests__/ingredientTokenizer.spec.ts`
    - `src/lib/units/__tests__/convert.spec.ts`
    - `src/lib/units/__tests__/normalize.spec.ts`
  - **Step Dependencies**: Steps 6–8, 17–18

- [ ] Step 31: Aggregation & rounding tests
  - **Task**: Integration tests for `scaleAndAggregate` and `roundToStorePacks`.
  - **Files**:
    - `src/lib/aggregate/__tests__/aggregate.spec.ts`
  - **Step Dependencies**: Steps 19–20

- [ ] Step 32: Playwright e2e (happy path)
  - **Task**: Automate: upload two recipes → select w/ multipliers → generate list → copy.
  - **Files**:
    - `playwright.config.ts`
    - `e2e/happy-path.spec.ts`
    - `e2e/fixtures/recipes/chili.txt`
    - `e2e/fixtures/recipes/pancakes.txt`
  - **Step Dependencies**: Steps 12–23
  - **User Instructions**:
    ```bash
    npm i -D @playwright/test
    npx playwright install
    npm run dev
    npx playwright test
    ```

## Examples & Documentation
- [ ] Step 33: Example recipes & format guide
  - **Task**: Provide sample `.txt` recipes and document the expected format with tips/troubleshooting.
  - **Files**:
    - `public/recipes/chili.txt`
    - `public/recipes/pancakes.txt`
    - `README.md`: "Recipe Text Format" section with example and common errors
  - **Step Dependencies**: Steps 6–8

- [ ] Step 34: Metadata & favicon
  - **Task**: Basic SEO/manifest bits and favicon.
  - **Files**:
    - `index.html`: `meta[name=description]`, viewport, theme-color
    - `public/favicon.ico`
  - **Step Dependencies**: Step 1

## Optional (MVP-adjacent)
- [ ] Step 35: PWA (offline app shell)
  - **Task**: Add `vite-plugin-pwa` for installability and offline caching.
  - **Files**:
    - `vite.config.ts`: PWA plugin config
    - `src/sw.ts` or auto-generated
  - **Step Dependencies**: Steps 1–3
  - **User Instructions**:
    ```bash
    npm i -D vite-plugin-pwa
    ```

- [ ] Step 36: Category mapping improvements
  - **Task**: Expand `categories.ts` with more keywords; add UI to collapse/expand categories.
  - **Files**:
    - `src/lib/aggregate/categories.ts`
    - `src/pages/ListPage.tsx`: collapsible groups
  - **Step Dependencies**: Step 21
