import { z } from 'zod'
import { recipeSchema, parsedRecipeSchema } from '../../schemas/recipeSchema'

export type ValidationSeverity = 'error' | 'warning'

export interface ValidationIssue {
  path: string
  message: string
  severity: ValidationSeverity
}

export interface ValidationResult<T> {
  ok: boolean
  data?: T
  issues: ValidationIssue[]
}

function formatPath(path: (string | number)[]): string {
  if (path.length === 0) return 'root'
  return path
    .map((seg) => (typeof seg === 'number' ? `[${seg}]` : `${String(seg)}`))
    .join('.')
}

function mapZodIssues(issues: z.ZodIssue[]): ValidationIssue[] {
  return issues.map((i) => ({
    path: formatPath(i.path as Array<string | number>),
    message: i.message,
    severity: 'error' as const,
  }))
}

export function validateParsedRecipe(input: unknown): ValidationResult<z.infer<typeof parsedRecipeSchema>> {
  const result = parsedRecipeSchema.safeParse(input)
  if (result.success) {
    return { ok: true, data: result.data, issues: [] }
  }
  return { ok: false, issues: mapZodIssues(result.error.issues) }
}

export function validateRecipe(input: unknown): ValidationResult<z.infer<typeof recipeSchema>> {
  const result = recipeSchema.safeParse(input)
  if (result.success) {
    return { ok: true, data: result.data, issues: [] }
  }
  return { ok: false, issues: mapZodIssues(result.error.issues) }
} 