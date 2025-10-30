export interface TextListItem {
  name: string
  qty: number
  unit?: string
}

export interface TextListGroup {
  category: string
  items: TextListItem[]
}

export function formatListAsText(groups: TextListGroup[]): string {
  const lines: string[] = []
  for (const group of groups) {
    lines.push(`${group.category}`)
    lines.push('-'.repeat(group.category.length))
    for (const item of group.items) {
      const qty = Number.isFinite(item.qty) ? item.qty.toFixed(2) : String(item.qty)
      const unit = item.unit ? ` ${item.unit}` : ''
      lines.push(`- ${qty}${unit} ${item.name}`)
    }
    lines.push('')
  }
  return lines.join('\n').trim() + '\n'
} 