import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: JwtPayload): string {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '7d'
  })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtSecret) as JwtPayload
  } catch (error) {
    return null
  }
}

export function extractToken(event: H3Event): string | null {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export async function requireAuth(event: H3Event): Promise<JwtPayload> {
  const token = extractToken(event)
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Token d\'authentification manquant'
    })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: 'Token d\'authentification invalide ou expiré'
    })
  }

  return payload
}

export async function requireRole(event: H3Event, roles: string[]): Promise<JwtPayload> {
  const payload = await requireAuth(event)
  
  if (!roles.includes(payload.role)) {
    throw createError({
      statusCode: 403,
      message: 'Accès non autorisé : rôle insuffisant'
    })
  }

  return payload
}

