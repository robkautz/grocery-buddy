import { useState, useEffect } from 'react'
import { NavTabs } from './components/NavTabs'
import type { Tab } from './components/NavTabs'
import { RecipesPage } from './pages/RecipesPage'
import { SelectPage } from './pages/SelectPage'
import { ListPage } from './pages/ListPage'
import { SettingsPage } from './pages/SettingsPage'
import { Loading } from './components/Loading'
import { EmptyState } from './components/EmptyState'
import { ErrorBanner } from './components/ErrorBanner'
import { ErrorProvider } from './contexts/ErrorContext'
import { useAppStore } from './state/store'

const tabs: Tab[] = [
  { id: 'recipes', label: 'Recipes', icon: '📝' },
  { id: 'select', label: 'Select', icon: '✅' },
  { id: 'list', label: 'Grocery List', icon: '🛒' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]

function App() {
  const [activeTab, setActiveTab] = useState('recipes')
  const { isHydrated, hydrateFromDB, recipes, loadSettings, isLoaded: settingsLoaded } = useAppStore()

  // Hydrate recipes and settings from DB on app startup
  useEffect(() => {
    if (!isHydrated && typeof window !== 'undefined') {
      void hydrateFromDB()
    }
    if (!settingsLoaded && typeof window !== 'undefined') {
      void loadSettings()
    }
  }, [isHydrated, hydrateFromDB, settingsLoaded, loadSettings])

  const renderPage = () => {
    // Show loading state while hydrating
    if (!isHydrated) {
      return <Loading />
    }

    // Show empty state if no recipes and on recipes page
    if (recipes.length === 0 && activeTab === 'recipes') {
      return (
        <EmptyState
          title="No recipes yet"
          message="Get started by uploading your first recipe. You can paste recipe text or upload a file."
          actionLabel="Upload Recipe"
          onAction={() => setActiveTab('recipes')}
        />
      )
    }

    // Show empty state if no recipes and on select page
    if (recipes.length === 0 && activeTab === 'select') {
      return (
        <EmptyState
          title="No recipes to select"
          message="You need to add some recipes first before you can create a grocery list."
          actionLabel="Add Recipes"
          onAction={() => setActiveTab('recipes')}
        />
      )
    }

    // Show empty state if no recipes and on list page
    if (recipes.length === 0 && activeTab === 'list') {
      return (
        <EmptyState
          title="No grocery list"
          message="Select some recipes first to generate your grocery list."
          actionLabel="Select Recipes"
          onAction={() => setActiveTab('select')}
        />
      )
    }

    // Render the appropriate page with navigation function
    switch (activeTab) {
      case 'recipes':
        return <RecipesPage onNavigate={setActiveTab} />
      case 'select':
        return <SelectPage onNavigate={setActiveTab} />
      case 'list':
        return <ListPage onNavigate={setActiveTab} />
      case 'settings':
        return <SettingsPage onNavigate={setActiveTab} />
      default:
        return <RecipesPage onNavigate={setActiveTab} />
    }
  }

  return (
    <ErrorProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Error banner for app-wide errors */}
        <ErrorBanner />
        
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <header className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-8 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Grocery Buddy</h1>
            <p className="text-lg opacity-90">Your personal recipe manager and grocery list generator</p>
          </div>
        </header>
        
        <NavTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <main id="main-content" role="main" className="focus-ring">
          {renderPage()}
        </main>
      </div>
    </ErrorProvider>
  )
}

export default App
