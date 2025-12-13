import { useState } from 'react'
import { Card, Button } from './ui'
import { copyText } from '../lib/utils/clipboard'

const CHATGPT_PROMPT = `📝 **RECIPE CONVERTER PROMPT FOR GROCERY BUDDY**

Please convert the recipe below into a Grocery Buddy compatible format:

Requirements:
- Must be a plain .txt file format
- Must use the exact section headers shown below
- Each ingredient MUST start with a dash (-)
- Each instruction MUST be numbered (1., 2., 3., etc.)
- Keep descriptions simple and clear

Template structure:
- Title: [Recipe Name]
- Servings: [Number of servings] (optional)
- Tags: [tag1, tag2, tag3] (optional, comma-separated)
- Ingredients: (start with a dash)
  - [quantity] [unit] [ingredient name]
  - [quantity] [unit] [ingredient name]
- Instructions: (numbered list)
  1. [First step]
  2. [Second step]
  3. [Third step]

Formatting guidelines:
✓ Use proper units: cup, tbsp, tsp, lb, oz, g, ml, etc.
✓ Use fractions for precise measurements: 1/2, 1/4, 3/4
✓ Use mixed numbers when appropriate: 1 1/2 cups
✓ Add descriptors to ingredients when needed: "onion, diced"
✓ Keep instructions clear and numbered
✓ Separate sections with blank lines
✓ Use Title: prefix for the recipe name
✓ Use Servings: prefix for number of servings
✓ Use Tags: prefix for comma-separated tags

Example output:

Title: Classic Apple Pie
Servings: 8
Tags: dessert, baking, traditional
Ingredients:
- 2 1/4 cups all-purpose flour
- 1 tsp salt
- 1 cup butter, chilled
- 5 cups apples, peeled and sliced
- 3/4 cup granulated sugar
- 1 tsp cinnamon
- 2 tbsp butter, melted
Instructions:
1. Mix flour and salt in a large bowl
2. Cut chilled butter into flour until crumbly
3. Add ice water gradually until dough forms
4. Roll out dough and place in pie dish
5. Mix apples with sugar and cinnamon
6. Pour apple mixture into crust
7. Cover with top crust and seal edges
8. Brush with melted butter
9. Bake at 375°F for 45 minutes

Now convert this recipe:
[PASTE YOUR RECIPE HERE]`

export function ChatGPTPrompt() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const success = await copyText(CHATGPT_PROMPT)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card padding="lg" shadow="md">
      <div className="text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">ChatGPT Recipe Converter</h3>
            <p className="text-sm text-gray-600">Copy this prompt to convert recipes with AI</p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : 'Copy Prompt'}
          </Button>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
            {CHATGPT_PROMPT}
          </pre>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          💡 Tip: Paste this prompt into ChatGPT, add your recipe at the end, then copy the output and save it as a .txt file in the recipes folder.
        </p>
      </div>
    </Card>
  )
}

