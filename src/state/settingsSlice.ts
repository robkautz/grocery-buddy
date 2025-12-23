const SETTINGS_STORAGE_KEY = 'grocery-buddy-settings'

export interface AppSettings {
  // Grocery List Settings
  groupByCategory: boolean
  sortAlphabetically: boolean
  showQuantities: boolean
  
  // Pantry Staples
  pantryStaples: string[] // Ingredients that are always in pantry (won't appear on grocery list)
  
  // Display Settings
  defaultServingSize: number
  
  // Data Settings
  autoSave: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  groupByCategory: true,
  sortAlphabetically: true,
  showQuantities: true,
  pantryStaples: [
    'salt',
    'pepper',
    'black pepper',
    'olive oil',
    'vegetable oil',
    'cooking oil',
    'garlic',
    'onion',
    'flour',
    'sugar',
    'baking powder',
    'baking soda',
    'vanilla extract',
  ],
  defaultServingSize: 1,
  autoSave: true,
}

export interface SettingsSlice {
  settings: AppSettings
  isLoaded: boolean
  loadSettings: () => Promise<void>
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
  resetSettings: () => Promise<void>
  addPantryStaple: (item: string) => Promise<void>
  removePantryStaple: (item: string) => Promise<void>
}

export function createSettingsSlice(
  set: (partial: Partial<SettingsSlice> | ((state: SettingsSlice) => Partial<SettingsSlice>)) => void,
  get: () => SettingsSlice
): SettingsSlice {
  return {
    settings: DEFAULT_SETTINGS,
    isLoaded: false,

    async loadSettings() {
      try {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
        
        if (stored) {
          const parsed = JSON.parse(stored)
          set({ settings: { ...DEFAULT_SETTINGS, ...parsed }, isLoaded: true })
        } else {
          // Save default settings
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
          set({ settings: DEFAULT_SETTINGS, isLoaded: true })
        }
      } catch (error) {
        console.error('Error loading settings:', error)
        set({ settings: DEFAULT_SETTINGS, isLoaded: true })
      }
    },

    async updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
      const newSettings = { ...get().settings, [key]: value }
      set({ settings: newSettings })
      
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
      } catch (error) {
        console.error('Error saving setting:', error)
        // Revert on error
        set({ settings: get().settings })
      }
    },

    async updateSettings(updates: Partial<AppSettings>) {
      const newSettings = { ...get().settings, ...updates }
      set({ settings: newSettings })
      
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
      } catch (error) {
        console.error('Error saving settings:', error)
        // Revert on error
        set({ settings: get().settings })
      }
    },

    async resetSettings() {
      set({ settings: DEFAULT_SETTINGS })
      
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
      } catch (error) {
        console.error('Error resetting settings:', error)
      }
    },

    async addPantryStaple(item: string) {
      const trimmed = item.trim().toLowerCase()
      if (!trimmed) return
      
      const currentStaples = get().settings.pantryStaples
      if (currentStaples.includes(trimmed)) return // Already exists
      
      const newStaples = [...currentStaples, trimmed].sort()
      await this.updateSetting('pantryStaples', newStaples)
    },

    async removePantryStaple(item: string) {
      const currentStaples = get().settings.pantryStaples
      const newStaples = currentStaples.filter(s => s !== item.toLowerCase())
      await this.updateSetting('pantryStaples', newStaples)
    },
  }
}
