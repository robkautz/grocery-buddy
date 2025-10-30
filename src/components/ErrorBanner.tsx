import { Alert } from './Alert'
import { useError } from '../contexts/ErrorContext'

export function ErrorBanner() {
  const { errors, removeError } = useError()

  if (errors.length === 0) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 space-y-2 max-h-96 overflow-y-auto">
      {errors.map((error) => {
        const variant = error.type === 'database' ? 'error' : 
                       error.type === 'validation' ? 'warning' :
                       error.type === 'parse' ? 'error' : 'info'
        
        return (
          <Alert
            key={error.id}
            variant={variant}
            title={error.title}
            dismissible={error.dismissible}
            onClose={() => removeError(error.id)}
            className="shadow-lg fade-in"
          >
            <div>
              <p>{error.message}</p>
              {error.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm opacity-75 hover:opacity-100">
                    Show details
                  </summary>
                  <pre className="mt-2 text-xs bg-black/5 p-2 rounded overflow-x-auto">
                    {error.details}
                  </pre>
                </details>
              )}
            </div>
          </Alert>
        )
      })}
    </div>
  )
}
