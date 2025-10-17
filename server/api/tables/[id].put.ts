import { z } from 'zod'

const updateTableSchema = z.object({
  number: z.number().int().positive().optional(),
  capacity: z.number().int().positive().optional(),
  status: z.enum(['LIBRE', 'OCCUPEE', 'RESERVEE', 'HORS_SERVICE']).optional(),
  location: z.string().optional()
})

export default defineEventHandler(async (event) => {
  // Admins et serveurs peuvent modifier les tables
  await requireRole(event, ['ADMIN', 'SERVEUR'])

  const id = getRouterParam(event, 'id')

  try {
    const body = await readBody(event)
    const validatedData = updateTableSchema.parse(body)

    // Si le numéro change, vérifier qu'il n'existe pas déjà
    if (validatedData.number) {
      const existingTable = await prisma.table.findFirst({
        where: {
          number: validatedData.number,
          NOT: { id }
        }
      })

      if (existingTable) {
        throw createError({
          statusCode: 400,
          message: 'Ce numéro de table existe déjà'
        })
      }
    }

    const table = await prisma.table.update({
      where: { id },
      data: validatedData
    })

    return table
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

