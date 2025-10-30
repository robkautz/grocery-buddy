import { Card } from './ui'
import type { ValidationIssue } from '../lib/parse/validators'

interface ParseResultAlertProps {
  title?: string
  issues: ValidationIssue[]
  onClose?: () => void
}

export function ParseResultAlert({ title = 'We found some issues', issues, onClose }: ParseResultAlertProps) {
  if (!issues || issues.length === 0) return null

  return (
    <div className="container mx-auto max-w-3xl px-4">
      <Card padding="md" shadow="md" className="border-red-200 bg-red-50">
        <div className="flex items-start">
          <div className="mr-3 text-red-600">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3l-6.93-12a2 2 0 00-3.48 0l-6.93 12a2 2 0 001.74 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-red-800">{title}</h3>
              {onClose && (
                <button onClick={onClose} className="text-red-600 hover:text-red-800 focus-ring rounded">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {issues.map((issue, idx) => (
                <li key={idx} className="text-sm text-red-800">
                  <span className="font-medium">{issue.path}:</span> {issue.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
} 