import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { ErrorProvider } from '../contexts/ErrorContext'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorProvider>
      {children}
    </ErrorProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: any
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
