import { z } from 'zod'

const createTableSchema = z.object({
  number: z.number().int().positive('Le numéro de table doit être positif'),
  capacity: z.number().int().positive('La capacité doit être positive'),
  location: z.string().optional()
})

export default defineEventHandler(async (event) => {
  // Seuls les admins peuvent créer des tables
  await requireRole(event, ['ADMIN'])

  try {
    const body = await readBody(event)
    const validatedData = createTableSchema.parse(body)

    // Vérifier si le numéro de table existe déjà
    const existingTable = await prisma.table.findUnique({
      where: { number: validatedData.number }
    })

    if (existingTable) {
      throw createError({
        statusCode: 400,
        message: 'Ce numéro de table existe déjà'
      })
    }

    // Créer la table
    const table = await prisma.table.create({
      data: {
        number: validatedData.number,
        capacity: validatedData.capacity,
        location: validatedData.location,
        status: 'LIBRE'
      }
    })

    // Générer le QR Code pour la table
    const qrData = generateTableQRData(table.id, table.number)
    const qrCode = await generateQRCode(qrData)

    // Mettre à jour la table avec le QR Code
    const updatedTable = await prisma.table.update({
      where: { id: table.id },
      data: { qrCode }
    })

    return updatedTable
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

