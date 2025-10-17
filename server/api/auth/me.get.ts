

export default defineEventHandler(async (event) => {
  const payload = await requireAuth(event)

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      createdAt: true,
      updatedAt: true
    }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Utilisateur non trouvé'
    })
  }

  return user
})

