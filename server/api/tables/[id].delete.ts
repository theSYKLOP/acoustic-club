

export default defineEventHandler(async (event) => {
  // Seuls les admins peuvent supprimer des tables
  await requireRole(event, ['ADMIN'])

  const id = getRouterParam(event, 'id')

  // Vérifier si la table a des commandes en cours
  const table = await prisma.table.findUnique({
    where: { id },
    include: {
      orders: {
        where: {
          status: {
            notIn: ['PAYE', 'ANNULE']
          }
        }
      }
    }
  })

  if (!table) {
    throw createError({
      statusCode: 404,
      message: 'Table non trouvée'
    })
  }

  if (table.orders.length > 0) {
    throw createError({
      statusCode: 400,
      message: 'Impossible de supprimer une table avec des commandes en cours'
    })
  }

  await prisma.table.delete({
    where: { id }
  })

  return { success: true, message: 'Table supprimée avec succès' }
})

