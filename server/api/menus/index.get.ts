

export default defineEventHandler(async (event) => {
  // Public - pas besoin d'authentification pour voir le menu
  const query = getQuery(event)
  
  const where: any = {}
  
  // Filtrer par catégorie si fournie
  if (query.category) {
    where.category = query.category
  }
  
  // Filtrer par disponibilité (par défaut, seulement les disponibles)
  if (query.available !== 'false') {
    where.available = true
  }

  const menus = await prisma.menu.findMany({
    where,
    orderBy: [
      { category: 'asc' },
      { name: 'asc' }
    ]
  })

  return menus
})

