import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'

const RECIPES_DIR = join(process.cwd(), 'public', 'recipes')
const PRIVATE_RECIPES_DIR = join(process.cwd(), 'public', 'recipes', 'private')

async function generateManifest(dir: string, outputFile: string) {
  try {
    const files = await readdir(dir, { withFileTypes: true })
    const recipeFiles = files
      .filter(file => 
        file.isFile() && 
        file.name.endsWith('.txt') && 
        !file.name.startsWith('.') // Skip hidden files
      )
      .map(file => file.name)
      .sort()
    
    const manifest = JSON.stringify(recipeFiles, null, 2) + '\n'
    await writeFile(outputFile, manifest, 'utf-8')
    console.log(`✓ Generated ${outputFile} with ${recipeFiles.length} recipes`)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // Directory doesn't exist, create empty manifest
      await writeFile(outputFile, '[]\n', 'utf-8')
      console.log(`✓ Created empty ${outputFile}`)
    } else {
      console.error(`Error generating ${outputFile}:`, error)
      throw error
    }
  }
}

async function main() {
  console.log('Generating recipe manifests...')
  await generateManifest(RECIPES_DIR, join(RECIPES_DIR, 'recipes.json'))
  await generateManifest(PRIVATE_RECIPES_DIR, join(PRIVATE_RECIPES_DIR, 'recipes.json'))
  console.log('Done!')
}

main().catch(error => {
  console.error('Failed to generate manifests:', error)
  process.exit(1)
})

