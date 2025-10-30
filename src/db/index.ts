import { openDB, type IDBPDatabase } from 'idb'
import type { GroceryBuddyDB } from './types'

const DB_NAME = 'grocery-buddy'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<GroceryBuddyDB>> | null = null

export function getDB(): Promise<IDBPDatabase<GroceryBuddyDB>> {
  if (!dbPromise) {
    dbPromise = openDB<GroceryBuddyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('recipes')) {
          const store = db.createObjectStore('recipes', { keyPath: 'id' })
          store.createIndex('by_title', 'title')
          store.createIndex('by_createdAt', 'createdAt')
        }
      },
    })
  }
  return dbPromise
} 