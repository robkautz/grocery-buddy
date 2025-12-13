export type SectionName = 'Title' | 'Servings' | 'Tags' | 'Ingredients' | 'Instructions'

export type SectionMap = Partial<Record<SectionName, string[]>>

export function normalizeLineEndings(input: string): string {
  return input.replace(/\r\n?/g, '\n')
}

export function isSectionHeader(line: string): boolean {
  const trimmed = line.trim()
  // Check for exact match (header only) or header with value (e.g., "Title: My Recipe" or "Title:My Recipe")
  return (
    trimmed === 'Title:' ||
    /^Title:/.test(trimmed) ||
    trimmed === 'Servings:' ||
    /^Servings:/.test(trimmed) ||
    trimmed === 'Tags:' ||
    /^Tags:/.test(trimmed) ||
    trimmed === 'Ingredients:' ||
    /^Ingredients:/.test(trimmed) ||
    trimmed === 'Instructions:' ||
    /^Instructions:/.test(trimmed)
  )
}

export function toSectionName(header: string): SectionName | null {
  // Extract section name from header (handles both "Title:" and "Title: Value" formats)
  const trimmed = header.trim()
  const colonIndex = trimmed.indexOf(':')
  if (colonIndex < 0) return null
  
  const key = trimmed.substring(0, colonIndex).trim() as SectionName
  if (key === 'Title' || key === 'Servings' || key === 'Tags' || key === 'Ingredients' || key === 'Instructions') {
    return key
  }
  return null
}

export function splitIntoSections(input: string): SectionMap {
  const text = normalizeLineEndings(input)
  const lines = text.split('\n')

  const sections: SectionMap = {}
  let current: SectionName | null = null

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    if (isSectionHeader(line)) {
      current = toSectionName(line)
      if (current) {
        if (!sections[current]) sections[current] = []
        
        // Extract value from same line if present (e.g., "Title: My Recipe" or "Title:My Recipe")
        const colonIndex = line.indexOf(':')
        if (colonIndex >= 0) {
          const value = line.substring(colonIndex + 1).trim()
          if (value) {
            sections[current].push(value)
          }
        }
      }
      continue
    }

    if (!current) {
      // Skip lines until the first known section header appears
      continue
    }

    if (!sections[current]) sections[current] = []
    const currentSection = sections[current]
    if (currentSection) {
      currentSection.push(line)
    }
  }

  return sections
}

export function cleanNonEmptyLines(lines: string[] | undefined): string[] {
  return (lines ?? []).map((l) => l.trim()).filter((l) => l.length > 0)
}

export function stripBulletPrefix(line: string): string {
  return line.replace(/^[-*]\s+/, '').trim()
}

export function stripNumericPrefix(line: string): string {
  return line.replace(/^\d+\.\s+/, '').trim()
} 