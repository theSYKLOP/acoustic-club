import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],

  // Configuration Tailwind CSS via @nuxt/ui
  css: ['~/assets/css/global.css'],

  // Configuration PWA
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Acoustic Club',
      short_name: 'Acoustic',
      description: 'Application de gestion de tables et commandes pour restaurants/boîtes',
      theme_color: '#6366f1',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\..*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 // 1 heure
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  // Configuration Pinia
  pinia: {
    storesDirs: ['./app/stores/**']
  },

  // Alias pour résoudre les imports correctement
  alias: {
    '~': fileURLToPath(new URL('./app', import.meta.url)),
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '~~': fileURLToPath(new URL('.', import.meta.url)),
    '@@': fileURLToPath(new URL('.', import.meta.url))
  },

  // Runtime Config
  runtimeConfig: {
    // Privé (serveur uniquement)
    jwtSecret: process.env.JWT_SECRET || 'acoustic-club-secret-key-change-in-production',
    databaseUrl: process.env.DATABASE_URL,
    
    // Public (client + serveur)
    public: {
      apiBase: process.env.API_BASE_URL || '/api',
      appName: 'Acoustic Club'
    }
  },

  // Configuration TypeScript
  typescript: {
    strict: true,
    shim: false
  },

  // Nitro (serveur)
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
  },

  // Optimizations
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  }
})