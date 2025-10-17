import { z } from 'zod'

const updateMenuSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.enum(['ENTREE', 'PLAT', 'DESSERT', 'BOISSON', 'ALCOOL', 'COCKTAIL', 'SNACK']).optional(),
  image: z.string().optional(),
  available: z.boolean().optional(),
  prepTime: z.number().int().positive().optional()
})

export default defineEventHandler(async (event) => {
  await requireRole(event, ['ADMIN'])

  const id = getRouterParam(event, 'id')

  try {
    const body = await readBody(event)
    const validatedData = updateMenuSchema.parse(body)

    const menu = await prisma.menu.update({
      where: { id },
      data: validatedData
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

