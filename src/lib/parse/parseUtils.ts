export type SectionName = 'Title' | 'Servings' | 'Tags' | 'Ingredients' | 'Instructions'

export type SectionMap = Partial<Record<SectionName, string[]>>

export function normalizeLineEndings(input: string): string {
  return input.replace(/\r\n?/g, '\n')
}

export function isSectionHeader(line: string): line is `${SectionName}:` {
  const trimmed = line.trim()
  return (
    trimmed === 'Title:' ||
    trimmed === 'Servings:' ||
    trimmed === 'Tags:' ||
    trimmed === 'Ingredients:' ||
    trimmed === 'Instructions:'
  )
}

export function toSectionName(header: string): SectionName | null {
  const key = header.trim().replace(/:$/, '') as SectionName
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
      if (current && !sections[current]) sections[current] = []
      continue
    }

    if (!current) {
      // Skip lines until the first known section header appears
      continue
    }

    if (!sections[current]) sections[current] = []
    ;(sections[current] as string[]).push(line)
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