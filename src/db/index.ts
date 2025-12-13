import { openDB, type IDBPDatabase } from 'idb'
import type { GroceryBuddyDB } from './types'

const DB_NAME = 'grocery-buddy'
const DB_VERSION = 2

let dbPromise: Promise<IDBPDatabase<GroceryBuddyDB>> | null = null

export function getDB(): Promise<IDBPDatabase<GroceryBuddyDB>> {
  if (!dbPromise) {
    dbPromise = openDB<GroceryBuddyDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        // Always ensure recipes store exists (for new DBs or migrations)
        if (!db.objectStoreNames.contains('recipes')) {
          const store = db.createObjectStore('recipes', { keyPath: 'id' })
          store.createIndex('by_title', 'title')
          store.createIndex('by_createdAt', 'createdAt')
        }
        
        // Create settings store when upgrading to version 2
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings')
          }
        }
      },
    })
  }
  return dbPromise
} 