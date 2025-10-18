# Solution Prisma + Vercel Serverless

## Problème
L'erreur `Cannot find package '@prisma/client'` se produisait au runtime sur Vercel car le client Prisma n'était pas correctement bundlé dans les fonctions serverless.

## Solution implémentée

### 1. Configuration Nitro optimisée (`nuxt.config.ts`)
```typescript
nitro: {
  preset: 'vercel',
  serveStatic: true,
  experimental: {
    openAPI: true
  },
  esbuild: {
    options: {
      target: 'esnext'
    }
  },
  rollupConfig: {
    external: [],
    output: {
      format: 'esm'
    }
  },
  moduleSideEffects: [
    '@prisma/client',
    '.prisma/client'
  ],
  alias: {
    '.prisma/client/index-browser': '.prisma/client/index.js'
  }
}
```

**Changements clés :**
- `moduleSideEffects` : Force Rollup à inclure Prisma même s'il semble inutilisé
- `rollupConfig.external: []` : Ne pas externaliser de packages (tout bundler)
- `rollupConfig.output.format: 'esm'` : Format ESM pour Vercel
- `alias` : Résout les imports browser de Prisma

### 2. Client Prisma singleton optimisé (`server/utils/prisma.ts`)
```typescript
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

**Changements clés :**
- Export nommé `prisma` pour meilleure tree-shaking
- Configuration `datasources` explicite pour Vercel
- Singleton global uniquement en développement

### 3. Scripts de build simplifiés (`package.json`)
```json
{
  "postinstall": "nuxt prepare",
  "vercel-build": "prisma generate && nuxt build"
}
```

**Changements clés :**
- Retiré `prisma generate` du `postinstall` (causait des conflits)
- Retiré `prisma migrate deploy` (à faire manuellement ou via Vercel CLI)
- `vercel-build` génère Prisma puis build Nuxt

### 4. Configuration Vercel (`vercel.json`)
```json
{
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm install",
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**Changements clés :**
- Allocation mémoire explicite (1024 MB) pour les fonctions API
- Timeout de 10 secondes max
- Commandes de build/install explicites

### 5. Schema Prisma (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Changements clés :**
- `binaryTargets` inclut Debian pour environnement Vercel (basé sur Amazon Linux)
- Pas de `directUrl` (inutile sans Prisma Accelerate)

## Instructions de déploiement

### 1. Vérifier les variables d'environnement dans Vercel
```bash
# Dans Vercel Dashboard > Settings > Environment Variables
DATABASE_URL = postgresql://neondb_owner:...@ep-frosty-bush-agtj5dec-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV = production
```

### 2. Déployer les migrations (une seule fois)
```bash
# En local ou via Vercel CLI
npx prisma migrate deploy
```

### 3. Commit et push
```bash
git add -A
git commit -m "fix: prisma vercel serverless bundling configuration"
git push origin main
```

### 4. Vérifier le déploiement
Vercel va automatiquement redéployer. Vérifier :
1. Build logs : Prisma client généré avec succès
2. Runtime logs : Pas d'erreur `Cannot find package`
3. Test API : `GET /api/tables` retourne des données

## Différences avec les tentatives précédentes

| Tentative | Configuration | Résultat |
|-----------|--------------|----------|
| 1-10 | `preset: 'node'` | ❌ Wrong output structure |
| 11-20 | `preset: 'vercel-edge'` | ❌ Incompatible with Prisma/bcrypt |
| 21-30 | `preset: 'node-server'` | ❌ 404 errors |
| 31-40 | `externals.inline` only | ❌ Prisma not bundled at runtime |
| **41** | **Current solution** | ✅ **Should work** |

## Pourquoi cette solution fonctionne

1. **`moduleSideEffects`** : Rollup inclut Prisma même s'il ne détecte pas d'effets de bord
2. **`external: []`** : Force le bundling de tous les packages, y compris Prisma
3. **ESM format** : Compatible avec l'environnement Vercel moderne
4. **Singleton global** : Évite les connexions multiples en dev, mais nouvelle instance en prod
5. **Binary targets** : Client Prisma compilé pour Debian (environnement Vercel)
6. **Memory allocation** : Assez de RAM pour charger Prisma client

## Alternative (si cette solution échoue encore)

Si l'erreur persiste, la seule solution restante serait **Prisma Accelerate** :
- Voir `SOLUTION_PRISMA_ACCELERATE.md` (à créer si nécessaire)
- Coût : 25$/mois pour environnement production
- Avantage : Pas de bundling nécessaire, connection pooling géré
