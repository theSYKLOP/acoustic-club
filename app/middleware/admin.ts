export default defineNuxtRouteMiddleware((to, from) => {
  // Ne pas exécuter côté serveur pour éviter les erreurs SSR
  if (process.server) return

  const authStore = useAuthStore()

  // Vérifier l'authentification
  const hasSession = authStore.isAuthenticated || authStore.hasValidSession()
  
  if (!hasSession) {
    return navigateTo('/login')
  }

  // Vérifier le rôle admin
  if (!authStore.isAdmin) {
    return navigateTo('/dashboard')
  }
})

