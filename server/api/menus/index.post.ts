import { z } from 'zod'

const createMenuSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  price: z.number().positive('Le prix doit être positif'),
  category: z.enum(['ENTREE', 'PLAT', 'DESSERT', 'BOISSON', 'ALCOOL', 'COCKTAIL', 'SNACK']),
  image: z.string().optional(),
  prepTime: z.number().int().positive().optional()
})

export default defineEventHandler(async (event) => {
  // Seuls les admins peuvent créer des items de menu
  await requireRole(event, ['ADMIN'])

  try {
    const body = await readBody(event)
    const validatedData = createMenuSchema.parse(body)

    const menu = await prisma.menu.create({
      data: {
        ...validatedData,
        available: true
      }
    })

    return menu
  } catch (error: any) {
    if (error.issues) {
      throw createError({
        statusCode: 400,
        message: error.issues[0].message
      })
    }
    throw error
  }
})

