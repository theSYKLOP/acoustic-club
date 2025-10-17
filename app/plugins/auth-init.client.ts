export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialiser l'auth depuis localStorage au démarrage de l'app
  await authStore.initializeAuth()
})
