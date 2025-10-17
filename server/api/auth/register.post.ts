import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = registerSchema.parse(body)

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Cet email est déjà utilisé'
      })
    }

    // Hash du mot de passe
    const hashedPassword = await hashPassword(validatedData.password)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        phone: validatedData.phone,
        role: 'CLIENT' // Par défaut
      },
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

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return {
      token,
      user
    }
  } catch (error: any) {
    if (error.issues) {
      // Erreur de validation Zod
      throw createError({
        statusCode: 400,
        message: error.issues[0].message
      })
    }
    throw error
  }
})

