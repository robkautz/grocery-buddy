import { useState } from 'react'
import { Button, Card, Input, Badge } from './ui'
import { parseRecipeText } from '../lib/parse/recipeParser'
import { validateParsedRecipe } from '../lib/parse/validators'
import { useAppStore } from '../state/store'
import { useErrorHelpers } from '../contexts/ErrorContext'
import type { RecipeId } from '../types/recipe'
import { ParseResultAlert } from './ParseResultAlert'

interface FileResult {
  fileName: string
  status: 'success' | 'error'
  message?: string
}

function generateId(): RecipeId {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `r_${Math.random().toString(36).slice(2, 10)}`
}

export function RecipeUpload() {
  const addRecipe = useAppStore((s) => s.addRecipe)
  const { addParseError, addDatabaseError } = useErrorHelpers()
  const [results, setResults] = useState<FileResult[]>([])
  const [issues, setIssues] = useState([] as ReturnType<typeof validateParsedRecipe>['issues'])
  const [loading, setLoading] = useState(false)

  async function handleFiles(files: FileList) {
    setLoading(true)
    const newResults: FileResult[] = []
    const newIssues: typeof issues = []

    for (const file of Array.from(files)) {
      try {
        const text = await file.text()
        const parsed = parseRecipeText(text)
        const validation = validateParsedRecipe(parsed)
        if (!validation.ok || validation.issues.length > 0) {
          newIssues.push(...(validation.issues || []))
          newResults.push({ fileName: file.name, status: 'error', message: 'Validation failed' })
          
          // Add parse error to global error banner
          addParseError(
            `Failed to parse recipe in ${file.name}`,
            validation.issues?.map(issue => `${issue.severity}: ${issue.message}`).join('\n')
          )
          continue
        }

        const id = generateId()
        await addRecipe({ id, ...parsed, sourceText: text })
        newResults.push({ fileName: file.name, status: 'success', message: `${parsed.title} added` })
      } catch (err) {
        const errorMessage = (err as Error).message
        newResults.push({ fileName: file.name, status: 'error', message: errorMessage })
        
        // Add database error to global error banner
        if (errorMessage.includes('database') || errorMessage.includes('IndexedDB')) {
          addDatabaseError(
            `Failed to save recipe from ${file.name}`,
            errorMessage
          )
        } else {
          addParseError(
            `Failed to process ${file.name}`,
            errorMessage
          )
        }
      }
    }

    setResults(newResults)
    setIssues(newIssues)
    setLoading(false)
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files && files.length > 0) {
      void handleFiles(files)
      e.currentTarget.value = ''
    }
  }

  return (
    <Card padding="lg" shadow="md">
      <div className="text-left">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Recipes</h3>
        <p className="text-gray-600 mb-6">Select one or more .txt files formatted with Title, Servings, Tags, Ingredients, and Instructions.</p>

        <div className="flex items-center gap-4 mb-4">
          <Input type="file" accept=".txt" multiple onChange={onInputChange} variant="file" inputSize="md"/>
          <Button variant="primary" size="md" loading={loading} onClick={() => {}} disabled>
            Choose files above
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Results</h4>
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li key={`${r.fileName}-${i}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-800">{r.fileName}</span>
                  {r.status === 'success' ? (
                    <Badge variant="success">{r.message ?? 'Success'}</Badge>
                  ) : (
                    <Badge variant="danger">{r.message ?? 'Error'}</Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {issues.length > 0 && (
          <div className="mt-6">
            <ParseResultAlert issues={issues} />
          </div>
        )}
      </div>
    </Card>
  )
} 