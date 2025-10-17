

export default defineEventHandler(async (event) => {
  const payload = await requireAuth(event)

  const where: any = {}

  // Si l'utilisateur n'est pas admin/serveur, ne montrer que ses commandes
  if (!['ADMIN', 'SERVEUR'].includes(payload.role)) {
    where.userId = payload.userId
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
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

  return orders
})

