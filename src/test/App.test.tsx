import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/utils'
import App from '../App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Grocery Buddy')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<App />)
    expect(screen.getByText('Recipes')).toBeInTheDocument()
    expect(screen.getByText('Select')).toBeInTheDocument()
    expect(screen.getByText('Grocery List')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<App />)
    expect(screen.getByText('Loading your recipes...')).toBeInTheDocument()
  })
})
