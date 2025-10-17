/**
 * Composable pour gérer l'authentification de manière réactive
 * Facilite l'accès aux informations d'authentification dans tous les composants
 */
export const useAuth = () => {
  const authStore = useAuthStore()

  return {
    // État
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    loading: computed(() => authStore.loading),
    error: computed(() => authStore.error),
    initialized: computed(() => authStore.initialized),

    // Getters
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isAdmin: computed(() => authStore.isAdmin),
    isServeur: computed(() => authStore.isServeur),
    isPremium: computed(() => authStore.isPremium),
    userName: computed(() => authStore.userName),
    userRole: computed(() => authStore.userRole),

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    fetchCurrentUser: authStore.fetchCurrentUser,
    hasValidSession: authStore.hasValidSession,

    // Helpers
    can: (role: 'ADMIN' | 'SERVEUR' | 'PREMIUM') => {
      if (role === 'ADMIN') return authStore.isAdmin
      if (role === 'SERVEUR') return authStore.isServeur
      if (role === 'PREMIUM') return authStore.isPremium
      return false
    }
  }
}
