import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface AppError {
  id: string
  type: 'parse' | 'database' | 'network' | 'validation' | 'unknown'
  title: string
  message: string
  details?: string
  timestamp: Date
  dismissible?: boolean
}

interface ErrorContextType {
  errors: AppError[]
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void
  removeError: (id: string) => void
  clearErrors: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

interface ErrorProviderProps {
  children: ReactNode
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [errors, setErrors] = useState<AppError[]>([])

  const addError = useCallback((error: Omit<AppError, 'id' | 'timestamp'>) => {
    const newError: AppError = {
      ...error,
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }
    
    setErrors(prev => [...prev, newError])
    
    // Auto-dismiss non-critical errors after 5 seconds
    if (error.type !== 'database' && error.type !== 'validation') {
      setTimeout(() => {
        setErrors(prev => prev.filter(e => e.id !== newError.id))
      }, 5000)
    }
  }, [])

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useError() {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

// Helper functions for common error types
export function useErrorHelpers() {
  const { addError } = useError()

  const addParseError = useCallback((message: string, details?: string) => {
    addError({
      type: 'parse',
      title: 'Recipe Parse Error',
      message,
      details,
      dismissible: true,
    })
  }, [addError])

  const addDatabaseError = useCallback((message: string, details?: string) => {
    addError({
      type: 'database',
      title: 'Database Error',
      message,
      details,
      dismissible: false,
    })
  }, [addError])

  const addNetworkError = useCallback((message: string, details?: string) => {
    addError({
      type: 'network',
      title: 'Network Error',
      message,
      details,
      dismissible: true,
    })
  }, [addError])

  const addValidationError = useCallback((message: string, details?: string) => {
    addError({
      type: 'validation',
      title: 'Validation Error',
      message,
      details,
      dismissible: true,
    })
  }, [addError])

  return {
    addParseError,
    addDatabaseError,
    addNetworkError,
    addValidationError,
  }
}
