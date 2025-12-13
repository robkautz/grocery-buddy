import { useEffect, useState } from 'react'
import { useAppStore } from '../state/store'
import { Card, Button } from '../components/ui'
import { Loading } from '../components/Loading'

interface SettingsPageProps {
  onNavigate: (tab: string) => void
}

export function SettingsPage({ onNavigate: _onNavigate }: SettingsPageProps) {
  const settings = useAppStore((s) => s.settings)
  const isLoaded = useAppStore((s) => s.isLoaded)
  const loadSettings = useAppStore((s) => s.loadSettings)
  const updateSetting = useAppStore((s) => s.updateSetting)
  const resetSettings = useAppStore((s) => s.resetSettings)
  const clearAllRecipes = useAppStore((s) => s.clearAllRecipes)
  const addPantryStaple = useAppStore((s) => s.addPantryStaple)
  const removePantryStaple = useAppStore((s) => s.removePantryStaple)

  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [newPantryItem, setNewPantryItem] = useState('')

  useEffect(() => {
    if (!isLoaded) {
      void loadSettings()
    }
  }, [isLoaded, loadSettings])

  function showSavedMessage() {
    setSavedMessage('Settings saved')
    setTimeout(() => setSavedMessage(null), 2000)
  }

  async function handleToggle<K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) {
    await updateSetting(key, value)
    showSavedMessage()
  }

  async function handleReset() {
    await resetSettings()
    setShowResetConfirm(false)
    showSavedMessage()
  }

  async function handleClearAll() {
    await clearAllRecipes()
    setShowClearConfirm(false)
    showSavedMessage()
  }

  async function handleAddPantryStaple() {
    if (!newPantryItem.trim()) return
    await addPantryStaple(newPantryItem)
    setNewPantryItem('')
    showSavedMessage()
  }

  async function handleRemovePantryStaple(item: string) {
    await removePantryStaple(item)
    showSavedMessage()
  }

  if (!isLoaded) {
    return <Loading />
  }

  return (
    <div className="py-8 px-4" role="tabpanel" id="settings-panel" aria-labelledby="settings-tab">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your Grocery Buddy experience</p>
        </div>

        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">✓ {savedMessage}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Grocery List Settings */}
          <Card padding="lg" shadow="md">
            <div className="text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Grocery List</h2>
              <p className="text-sm text-gray-600 mb-6">Customize how your grocery list is displayed</p>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label htmlFor="groupByCategory" className="block text-sm font-medium text-gray-700 mb-1">
                      Group by Category
                    </label>
                    <p className="text-xs text-gray-500">
                      Organize items by category (e.g., Produce, Dairy, Meat)
                    </p>
                  </div>
                  <button
                    id="groupByCategory"
                    onClick={() => handleToggle('groupByCategory', !settings.groupByCategory)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      settings.groupByCategory ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.groupByCategory}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.groupByCategory ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label htmlFor="sortAlphabetically" className="block text-sm font-medium text-gray-700 mb-1">
                      Sort Alphabetically
                    </label>
                    <p className="text-xs text-gray-500">
                      Sort items alphabetically within each category
                    </p>
                  </div>
                  <button
                    id="sortAlphabetically"
                    onClick={() => handleToggle('sortAlphabetically', !settings.sortAlphabetically)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      settings.sortAlphabetically ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.sortAlphabetically}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.sortAlphabetically ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label htmlFor="showQuantities" className="block text-sm font-medium text-gray-700 mb-1">
                      Show Quantities
                    </label>
                    <p className="text-xs text-gray-500">
                      Display quantities for each ingredient
                    </p>
                  </div>
                  <button
                    id="showQuantities"
                    onClick={() => handleToggle('showQuantities', !settings.showQuantities)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      settings.showQuantities ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.showQuantities}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.showQuantities ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Pantry Staples */}
          <Card padding="lg" shadow="md">
            <div className="text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Pantry Staples</h2>
              <p className="text-sm text-gray-600 mb-6">
                Ingredients you always have on hand. These won't appear on your grocery list.
              </p>

              <div className="space-y-4">
                {/* Add new staple */}
                <div>
                  <label htmlFor="newPantryItem" className="block text-sm font-medium text-gray-700 mb-2">
                    Add Pantry Staple
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enter an ingredient name (e.g., "salt", "olive oil", "garlic")
                  </p>
                  <div className="flex gap-2">
                    <input
                      id="newPantryItem"
                      type="text"
                      value={newPantryItem}
                      onChange={(e) => setNewPantryItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          void handleAddPantryStaple()
                        }
                      }}
                      placeholder="e.g., salt, pepper, olive oil"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleAddPantryStaple}
                      disabled={!newPantryItem.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* List of pantry staples */}
                {settings.pantryStaples.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Pantry Staples ({settings.pantryStaples.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {settings.pantryStaples.map((item) => (
                        <div
                          key={item}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-800"
                        >
                          <span>{item}</span>
                          <button
                            onClick={() => void handleRemovePantryStaple(item)}
                            className="text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            aria-label={`Remove ${item} from pantry staples`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {settings.pantryStaples.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No pantry staples added yet.</p>
                )}
              </div>
            </div>
          </Card>

          {/* Display Settings */}
          <Card padding="lg" shadow="md">
            <div className="text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Display</h2>
              <p className="text-sm text-gray-600 mb-6">Adjust default display preferences</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="defaultServingSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Default Serving Size
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Default multiplier when selecting recipes (1 = original recipe servings)
                  </p>
                  <input
                    id="defaultServingSize"
                    type="number"
                    min="0.25"
                    max="10"
                    step="0.25"
                    value={settings.defaultServingSize}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 1
                      void handleToggle('defaultServingSize', value)
                    }}
                    className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card padding="lg" shadow="md">
            <div className="text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Data Management</h2>
              <p className="text-sm text-gray-600 mb-6">Manage your recipes and settings</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Reset Settings</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Restore all settings to their default values
                  </p>
                  {!showResetConfirm ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setShowResetConfirm(true)}
                    >
                      Reset Settings
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-700">Are you sure?</p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleReset}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowResetConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-red-700 mb-2">Clear All Recipes</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Permanently delete all recipes. This action cannot be undone.
                  </p>
                  {!showClearConfirm ? (
                    <Button
                      variant="danger"
                      size="md"
                      onClick={() => setShowClearConfirm(true)}
                    >
                      Clear All Recipes
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-red-700 font-medium">This cannot be undone!</p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleClearAll}
                      >
                        Delete All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowClearConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

