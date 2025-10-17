import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis')
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = loginSchema.parse(body)

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect'
      })
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(validatedData.password, user.password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect'
      })
    }

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user

    return {
      token,
      user: userWithoutPassword
    }
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

