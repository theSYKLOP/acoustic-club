

export default defineEventHandler(async (event) => {
  await requireRole(event, ['ADMIN'])

  const id = getRouterParam(event, 'id')

  await prisma.menu.delete({
    where: { id }
  })

  return { success: true, message: 'Item de menu supprimé avec succès' }
})

