

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const tables = await prisma.table.findMany({
    orderBy: { number: 'asc' },
    include: {
      _count: {
        select: { orders: true }
      }
    }
  })

  return tables
})

