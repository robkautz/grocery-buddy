import { useState } from 'react'
import { Button, Card, Badge } from './ui'
import { parseRecipeText } from '../lib/parse/recipeParser'
import { validateParsedRecipe } from '../lib/parse/validators'
import { useAppStore } from '../state/store'
import { useErrorHelpers } from '../contexts/ErrorContext'
import type { RecipeId } from '../types/recipe'
import { ParseResultAlert } from './ParseResultAlert'

function generateId(): RecipeId {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `r_${Math.random().toString(36).slice(2, 10)}`
}

export function RecipePaste() {
  const addRecipe = useAppStore((s) => s.addRecipe)
  const { addParseError, addDatabaseError } = useErrorHelpers()
  const [recipeText, setRecipeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [issues, setIssues] = useState([] as ReturnType<typeof validateParsedRecipe>['issues'])

  async function handleSubmit() {
    if (!recipeText.trim()) {
      setError('Please paste a recipe')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)
    setIssues([])

    try {
      const parsed = parseRecipeText(recipeText)
      const validation = validateParsedRecipe(parsed)

      if (!validation.ok || validation.issues.length > 0) {
        setIssues(validation.issues || [])
        setError('Validation failed. Please check the recipe format.')
        
        addParseError(
          'Failed to parse pasted recipe',
          validation.issues?.map(issue => `${issue.severity}: ${issue.message}`).join('\n')
        )
        setLoading(false)
        return
      }

      const id = generateId()
      await addRecipe({ id, ...parsed, sourceText: recipeText })
      
      setSuccess(true)
      setRecipeText('') // Clear the textarea
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      const errorMessage = (err as Error).message
      setError(errorMessage)
      
      if (errorMessage.includes('storage') || errorMessage.includes('localStorage')) {
        addDatabaseError(
          'Failed to save pasted recipe',
          errorMessage
        )
      } else {
        addParseError(
          'Failed to process pasted recipe',
          errorMessage
        )
      }
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setRecipeText('')
    setError(null)
    setSuccess(false)
    setIssues([])
  }

  return (
    <Card padding="lg" shadow="md">
      <div className="text-left">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Paste Recipe</h3>
        <p className="text-gray-600 mb-4">Paste a recipe from ChatGPT or any text source. Make sure it follows the Grocery Buddy format.</p>

        <div className="mb-4">
          <textarea
            value={recipeText}
            onChange={(e) => {
              setRecipeText(e.target.value)
              setError(null)
              setSuccess(false)
            }}
            placeholder="Paste your recipe here...&#10;&#10;Title: My Recipe&#10;Servings: 4&#10;Tags: dinner, easy&#10;&#10;Ingredients:&#10;- 1 cup flour&#10;- 2 eggs&#10;&#10;Instructions:&#10;1. First step&#10;2. Second step"
            className="w-full h-64 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y font-mono"
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !recipeText.trim()}
          >
            Add Recipe
          </Button>
          {recipeText && (
            <Button
              variant="outline"
              size="md"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </Button>
          )}
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="success">Recipe added successfully!</Badge>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {issues.length > 0 && (
          <div className="mt-4">
            <ParseResultAlert issues={issues} />
          </div>
        )}
      </div>
    </Card>
  )
}

