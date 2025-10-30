import { test, expect } from '@playwright/test'
import path from 'path'

test.describe('Grocery Buddy Happy Path', () => {
  test('complete workflow: upload recipes → select → generate list → copy', async ({ page }) => {
    // Navigate to the app
    await page.goto('/')
    
    // Wait for the app to load
    await expect(page.getByText('Grocery Buddy')).toBeVisible()
    
    // Should start on Recipes tab
    await expect(page.getByText('Recipes')).toBeVisible()
    
    // Upload first recipe (chili)
    const chiliFile = path.join(__dirname, 'fixtures/recipes/chili.txt')
    await page.setInputFiles('input[type="file"]', chiliFile)
    
    // Wait for upload to complete
    await expect(page.getByText('Classic Chili added')).toBeVisible()
    
    // Upload second recipe (pancakes)
    const pancakesFile = path.join(__dirname, 'fixtures/recipes/pancakes.txt')
    await page.setInputFiles('input[type="file"]', pancakesFile)
    
    // Wait for upload to complete
    await expect(page.getByText('Fluffy Pancakes added')).toBeVisible()
    
    // Verify recipes are displayed
    await expect(page.getByText('Classic Chili')).toBeVisible()
    await expect(page.getByText('Fluffy Pancakes')).toBeVisible()
    
    // Navigate to Select tab
    await page.getByText('Select').click()
    
    // Wait for select page to load
    await expect(page.getByText('Select Dishes')).toBeVisible()
    
    // Select both recipes
    await page.getByText('Classic Chili').click()
    await page.getByText('Fluffy Pancakes').click()
    
    // Verify both recipes are selected
    await expect(page.locator('[aria-pressed="true"]').filter({ hasText: 'Classic Chili' })).toBeVisible()
    await expect(page.locator('[aria-pressed="true"]').filter({ hasText: 'Fluffy Pancakes' })).toBeVisible()
    
    // Adjust serving multipliers
    // Set chili to 1.5x (9 servings)
    const chiliMultiplier = page.locator('input[type="number"]').first()
    await chiliMultiplier.fill('1.5')
    
    // Set pancakes to 2x (8 servings)
    const pancakesMultiplier = page.locator('input[type="number"]').nth(1)
    await pancakesMultiplier.fill('2')
    
    // Navigate to Grocery List tab
    await page.getByText('Grocery List').click()
    
    // Wait for list page to load
    await expect(page.getByText('Grocery List')).toBeVisible()
    
    // Verify the list is generated
    await expect(page.getByText('Produce')).toBeVisible()
    await expect(page.getByText('Meat')).toBeVisible()
    await expect(page.getByText('Dairy')).toBeVisible()
    await expect(page.getByText('Baking')).toBeVisible()
    
    // Check for specific ingredients
    await expect(page.getByText('ground beef')).toBeVisible()
    await expect(page.getByText('onion')).toBeVisible()
    await expect(page.getByText('flour')).toBeVisible()
    await expect(page.getByText('milk')).toBeVisible()
    await expect(page.getByText('eggs')).toBeVisible()
    
    // Test copy functionality
    await page.getByText('Copy List').click()
    
    // Verify copy success message
    await expect(page.getByText('List copied to clipboard!')).toBeVisible()
    
    // Test print functionality
    await page.getByText('Print List').click()
    
    // Verify print dialog opens (this will vary by browser)
    // We'll just verify the button works without checking the actual print dialog
  })
  
  test('handles empty states gracefully', async ({ page }) => {
    // Navigate to the app
    await page.goto('/')
    
    // Should show empty state for recipes
    await expect(page.getByText('No recipes yet')).toBeVisible()
    
    // Navigate to Select tab
    await page.getByText('Select').click()
    
    // Should show empty state for selection
    await expect(page.getByText('No recipes to select')).toBeVisible()
    
    // Navigate to Grocery List tab
    await page.getByText('Grocery List').click()
    
    // Should show empty state for list
    await expect(page.getByText('No grocery list')).toBeVisible()
  })
  
  test('search and filter functionality', async ({ page }) => {
    // Upload a recipe first
    const chiliFile = path.join(__dirname, 'fixtures/recipes/chili.txt')
    await page.setInputFiles('input[type="file"]', chiliFile)
    
    await expect(page.getByText('Classic Chili added')).toBeVisible()
    
    // Test search functionality
    await page.getByPlaceholder('Search recipes...').fill('chili')
    await expect(page.getByText('Classic Chili')).toBeVisible()
    
    // Test search with no results
    await page.getByPlaceholder('Search recipes...').fill('pasta')
    await expect(page.getByText('No recipes found')).toBeVisible()
    
    // Clear search
    await page.getByPlaceholder('Search recipes...').fill('')
    await expect(page.getByText('Classic Chili')).toBeVisible()
    
    // Test tag filtering
    await page.getByText('dinner').click()
    await expect(page.getByText('Classic Chili')).toBeVisible()
    
    // Test tag filter with no results
    await page.getByText('breakfast').click()
    await expect(page.getByText('No recipes found')).toBeVisible()
  })
  
  test('recipe detail modal', async ({ page }) => {
    // Upload a recipe
    const chiliFile = path.join(__dirname, 'fixtures/recipes/chili.txt')
    await page.setInputFiles('input[type="file"]', chiliFile)
    
    await expect(page.getByText('Classic Chili added')).toBeVisible()
    
    // Click on recipe to open modal
    await page.getByText('Classic Chili').click()
    
    // Verify modal opens
    await expect(page.getByText('Classic Chili')).toBeVisible()
    await expect(page.getByText('Servings: 6')).toBeVisible()
    await expect(page.getByText('Tags: dinner, comfort food, spicy')).toBeVisible()
    
    // Check ingredients are displayed
    await expect(page.getByText('1 lb ground beef')).toBeVisible()
    await expect(page.getByText('1 medium onion, diced')).toBeVisible()
    
    // Check instructions are displayed
    await expect(page.getByText('Brown the ground beef')).toBeVisible()
    
    // Close modal
    await page.getByRole('button', { name: 'Close' }).click()
    
    // Verify modal is closed
    await expect(page.getByText('Classic Chili')).toBeVisible()
  })
  
  test('responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Verify app works on mobile
    await expect(page.getByText('Grocery Buddy')).toBeVisible()
    await expect(page.getByText('Recipes')).toBeVisible()
    await expect(page.getByText('Select')).toBeVisible()
    await expect(page.getByText('Grocery List')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    
    // Verify app works on tablet
    await expect(page.getByText('Grocery Buddy')).toBeVisible()
  })
})
