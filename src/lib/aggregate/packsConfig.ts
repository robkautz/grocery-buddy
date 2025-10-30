export type RoundingRule =
  | { type: 'nearest'; unit: 'lb'; step: number } // e.g., round pounds to nearest 1 lb
  | { type: 'ceil'; unit: 'count' } // e.g., count items to whole numbers
  | { type: 'ceil-multiple'; unit: 'count'; keyword: string; multiple: number } // e.g., eggs to packs of 12

export interface PacksConfig {
  rules: RoundingRule[]
}

export const defaultPacksConfig: PacksConfig = {
  rules: [
    { type: 'nearest', unit: 'lb', step: 1 },
    { type: 'ceil', unit: 'count' },
    { type: 'ceil-multiple', unit: 'count', keyword: 'egg', multiple: 12 },
  ],
} 