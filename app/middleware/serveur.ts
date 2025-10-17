export default defineNuxtRouteMiddleware((to, from) => {
  // Ne pas exécuter côté serveur pour éviter les erreurs SSR
  if (process.server) return

  const authStore = useAuthStore()

  // Vérifier l'authentification
  const hasSession = authStore.isAuthenticated || authStore.hasValidSession()
  
  if (!hasSession) {
    return navigateTo('/login')
  }

  // Admin et serveur autorisés
  if (!authStore.isServeur) {
    return navigateTo('/dashboard')
  }
})

