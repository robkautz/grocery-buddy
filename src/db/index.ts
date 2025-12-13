import { openDB, type IDBPDatabase } from 'idb'
import type { GroceryBuddyDB } from './types'

const DB_NAME = 'grocery-buddy'
const DB_VERSION = 2

let dbPromise: Promise<IDBPDatabase<GroceryBuddyDB>> | null = null

export function getDB(): Promise<IDBPDatabase<GroceryBuddyDB>> {
  if (!dbPromise) {
    dbPromise = openDB<GroceryBuddyDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          // Create recipes store
          if (!db.objectStoreNames.contains('recipes')) {
            const store = db.createObjectStore('recipes', { keyPath: 'id' })
            store.createIndex('by_title', 'title')
            store.createIndex('by_createdAt', 'createdAt')
          }
        }
        
        if (oldVersion < 2) {
          // Create settings store
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings')
          }
        }
      },
    })
  }
  return dbPromise
} 