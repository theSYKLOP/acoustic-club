export default defineNuxtRouteMiddleware((to, from) => {
  // Gestionnaire d'erreur global pour les routes
  const { $router } = useNuxtApp()

  // Intercepter les erreurs de navigation
  $router.onError((error) => {
    console.error('Erreur de navigation:', error)
    
    // Rediriger vers une page d'erreur appropriée si nécessaire
    if (error.message?.includes('404')) {
      // Laisser Nuxt gérer les 404 automatiquement
      return
    }
    
    // Pour les autres erreurs, rediriger vers la page d'accueil
    if (error.message?.includes('403') || error.message?.includes('401')) {
      navigateTo('/login')
    }
  })

  // Vérifier si l'utilisateur est authentifié pour les routes protégées
  const authStore = useAuthStore()
  
  // Initialiser l'authentification si nécessaire
  if (process.client && !authStore.token) {
    authStore.initializeAuth()
  }

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/dashboard', '/admin', '/serveur']
  const adminRoutes = ['/admin']
  const serveurRoutes = ['/serveur']

  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => to.path.startsWith(route))
  const isServeurRoute = serveurRoutes.some(route => to.path.startsWith(route))

  if (isProtectedRoute) {
    // Vérifier l'authentification
    if (!authStore.isAuthenticated) {
      return navigateTo('/login')
    }

    // Vérifier les permissions pour les routes admin
    if (isAdminRoute && !authStore.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès non autorisé - Privilèges administrateur requis'
      })
    }

    // Vérifier les permissions pour les routes serveur
    if (isServeurRoute && !authStore.isServeur) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès non autorisé - Privilèges serveur requis'
      })
    }
  }
})

