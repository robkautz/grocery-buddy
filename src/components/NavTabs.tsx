export type Tab = {
  id: string
  label: string
  icon?: string
}

interface NavTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function NavTabs({ tabs, activeTab, onTabChange }: NavTabsProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-tab touch-target focus-ring transition-smooth ${
                activeTab === tab.id ? 'nav-tab-active' : 'nav-tab-inactive'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              tabIndex={activeTab === tab.id ? 0 : -1}
            >
              {tab.icon && <span className="mr-2" aria-hidden="true">{tab.icon}</span>}
              <span className="sr-only">Navigate to </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
} 