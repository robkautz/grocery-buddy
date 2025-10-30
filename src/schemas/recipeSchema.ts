import { z } from 'zod'

export const ingredientSchema = z.object({
	item: z.string().min(1, 'Ingredient item is required'),
	qty: z.number().positive().optional(),
	unit: z.string().trim().min(1).optional(),
	note: z.string().trim().min(1).optional(),
})

export const parsedRecipeSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	servings: z.number().positive().int().optional(),
	tags: z.array(z.string().trim().toLowerCase()).default([]),
	ingredients: z.array(ingredientSchema).default([]),
	instructions: z.array(z.string().min(1)).default([]),
})

export const recipeSchema = parsedRecipeSchema.extend({
	id: z.string().min(1),
	sourceText: z.string().optional(),
	createdAt: z.string().datetime().optional(),
	updatedAt: z.string().datetime().optional(),
})

export type IngredientInput = z.infer<typeof ingredientSchema>
export type ParsedRecipeInput = z.infer<typeof parsedRecipeSchema>
export type RecipeInput = z.infer<typeof recipeSchema> 