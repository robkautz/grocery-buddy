export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] fade-in">
      <div className="text-center">
        <div className="inline-block spinner rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-600 text-lg transition-colors duration-200">Loading your recipes...</p>
      </div>
    </div>
  )
} 