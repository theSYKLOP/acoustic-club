import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'vercel',
  // Inline Prisma pour Vercel serverless
  externals: {
    inline: [/@prisma/]
  },
  
  // Configuration pour les modules qui ont des effets de bord
  moduleSideEffects: [
    '@prisma/client'
  ],
  
  // Alias pour résoudre les chemins Prisma
  alias: {
    '.prisma/client': '@prisma/client'
  },
  
  // Ne pas minifier le code serveur (améliore la compatibilité)
  minify: false,
  
  // Configuration rollup pour gérer les modules externes
  rollupConfig: {
    external: [
      '@prisma/client',
      '.prisma/client',
      '@prisma/engines'
    ]
  }
})
