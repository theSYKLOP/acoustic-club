

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')

  const table = await prisma.table.findUnique({
    where: { id },
    include: {
      assignments: {
        orderBy: { startTime: 'desc' },
        take: 5,
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          items: {
            include: {
              menu: true
            }
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

  return table
})

