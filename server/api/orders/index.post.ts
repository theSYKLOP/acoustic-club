import { z } from 'zod'

const createOrderSchema = z.object({
  tableId: z.string(),
  userId: z.string().optional(),
  items: z.array(z.object({
    menuId: z.string(),
    quantity: z.number().int().positive(),
    notes: z.string().optional()
  })).min(1, 'La commande doit contenir au moins un item'),
  notes: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const payload = await requireAuth(event)

  try {
    const body = await readBody(event)
    const validatedData = createOrderSchema.parse(body)

    // Vérifier que la table existe et est disponible
    const table = await prisma.table.findUnique({
      where: { id: validatedData.tableId }
    })

    if (!table) {
      throw createError({
        statusCode: 404,
        message: 'Table non trouvée'
      })
    }

    // Récupérer les menus pour calculer le total
    const menuIds = validatedData.items.map(item => item.menuId)
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds } }
    })

    // Calculer le montant total
    let totalAmount = 0
    const orderItems = validatedData.items.map(item => {
      const menu = menus.find(m => m.id === item.menuId)
      if (!menu) {
        throw createError({
          statusCode: 404,
          message: `Menu ${item.menuId} non trouvé`
        })
      }
      if (!menu.available) {
        throw createError({
          statusCode: 400,
          message: `${menu.name} n'est plus disponible`
        })
      }
      const itemTotal = menu.price * item.quantity
      totalAmount += itemTotal
      
      return {
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price,
        notes: item.notes
      }
    })

    // Générer un numéro de commande unique
    const orderNumber = `AC${Date.now().toString().slice(-8)}`

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: validatedData.userId || payload.userId,
        tableId: validatedData.tableId,
        totalAmount,
        notes: validatedData.notes,
        status: 'EN_ATTENTE',
        items: {
          create: orderItems
        }
      },
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

    // Générer le QR Code pour la commande
    const qrData = generateOrderQRData(order.id, order.orderNumber)
    const qrCode = await generateQRCode(qrData)

    // Mettre à jour la commande avec le QR Code
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { qrCode },
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

    // Mettre à jour le statut de la table
    await prisma.table.update({
      where: { id: validatedData.tableId },
      data: { status: 'OCCUPEE' }
    })

    return updatedOrder
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

