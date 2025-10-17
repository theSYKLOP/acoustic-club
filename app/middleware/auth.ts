export default defineNuxtRouteMiddleware((to, from) => {
  // Ne pas exécuter côté serveur pour éviter les erreurs SSR
  if (process.server) return

  const authStore = useAuthStore()

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ['/login', '/register', '/']

  // Si la route nécessite une authentification
  if (!publicRoutes.includes(to.path)) {
    // Vérifier le store ET le localStorage pour plus de réactivité
    const hasSession = authStore.isAuthenticated || authStore.hasValidSession()
    
    if (!hasSession) {
      return navigateTo('/login')
    }
  }
})

