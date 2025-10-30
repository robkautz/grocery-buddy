import { useState } from 'react'
import { Button, Input } from './ui'

interface GroceryItemRowProps {
  itemKey: string
  name: string
  qty: number
  unit?: string
  owned: boolean
  onToggleOwned: (key: string) => void
  onUpdate: (key: string, update: { name?: string; qty?: number; unit?: string }) => void
}

export function GroceryItemRow({ itemKey, name, qty, unit, owned, onToggleOwned, onUpdate }: GroceryItemRowProps) {
  const [editing, setEditing] = useState(false)
  const [localName, setLocalName] = useState(name)
  const [localQty, setLocalQty] = useState(qty)
  const [localUnit, setLocalUnit] = useState(unit ?? '')

  function save() {
    onUpdate(itemKey, {
      name: localName !== name ? localName : undefined,
      qty: localQty !== qty ? localQty : undefined,
      unit: localUnit !== (unit ?? '') ? localUnit : undefined,
    })
    setEditing(false)
  }

  return (
    <li className={`flex items-center justify-between transition-all duration-300 ${owned ? 'opacity-60' : ''}`} role="listitem">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={owned}
          onChange={() => onToggleOwned(itemKey)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 touch-target"
          aria-label={`Mark ${name} as already owned`}
          aria-describedby={`item-${itemKey}-details`}
        />
        {editing ? (
          <div className="flex items-center gap-2" role="group" aria-label="Edit item details">
            <Input 
              value={localName} 
              onChange={(e) => setLocalName(e.target.value)} 
              inputSize="sm"
              aria-label="Item name"
              placeholder="Item name"
            />
            <Input 
              type="number" 
              value={localQty} 
              onChange={(e) => setLocalQty(parseFloat(e.target.value))} 
              inputSize="sm"
              aria-label="Quantity"
              placeholder="Qty"
            />
            <Input 
              value={localUnit} 
              onChange={(e) => setLocalUnit(e.target.value)} 
              inputSize="sm"
              aria-label="Unit"
              placeholder="Unit"
            />
          </div>
        ) : (
          <span id={`item-${itemKey}-details`} className="text-gray-800">
            <span className="sr-only">Item: </span>
            {name}
            <span className="sr-only">, Quantity: {qty.toFixed(2)} {unit ?? ''}</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {editing ? (
          <>
            <Button size="sm" variant="primary" onClick={save} aria-label="Save changes">Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)} aria-label="Cancel editing">Cancel</Button>
          </>
        ) : (
          <>
            <span className="text-gray-600" aria-label="Quantity">{qty.toFixed(2)} {unit ?? ''}</span>
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)} aria-label={`Edit ${name}`}>Edit</Button>
          </>
        )}
      </div>
    </li>
  )
} 