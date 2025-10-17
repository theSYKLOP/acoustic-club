import { z } from 'zod'

const updateOrderSchema = z.object({
  status: z.enum(['EN_ATTENTE', 'EN_PREPARATION', 'PRET', 'SERVI', 'ANNULE', 'PAYE']).optional(),
  notes: z.string().optional()
})

export default defineEventHandler(async (event) => {
  // Admins et serveurs peuvent modifier les commandes
  await requireRole(event, ['ADMIN', 'SERVEUR'])

  const id = getRouterParam(event, 'id')

  try {
    const body = await readBody(event)
    const validatedData = updateOrderSchema.parse(body)

    const order = await prisma.order.update({
      where: { id },
      data: validatedData,
      include: {
        items: {
          include: {
            menu: true
          }
        },
        table: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Si la commande est payée, libérer la table
    if (validatedData.status === 'PAYE') {
      await prisma.table.update({
        where: { id: order.tableId },
        data: { status: 'LIBRE' }
      })
    }

    return order
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

