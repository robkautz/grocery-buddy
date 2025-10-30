import type { AggregatedItem } from './scaleAndAggregate'
import type { PacksConfig } from './packsConfig'

export function roundToStorePacks(items: AggregatedItem[], config: PacksConfig): AggregatedItem[] {
  return items.map((item) => {
    let qty = item.qty

    for (const rule of config.rules) {
      if (rule.type === 'nearest' && item.unit === rule.unit) {
        const factor = 1 / rule.step
        qty = Math.round(qty * factor) / factor
      }

      if (rule.type === 'ceil' && item.unit === rule.unit) {
        qty = Math.ceil(qty)
      }

      if (rule.type === 'ceil-multiple' && item.unit === rule.unit) {
        if (item.name.toLowerCase().includes(rule.keyword)) {
          qty = Math.ceil(qty / rule.multiple) * rule.multiple
        }
      }
    }

    return { ...item, qty }
  })
} 