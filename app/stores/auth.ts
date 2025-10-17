import { defineStore } from 'pinia'
import type { User, LoginDTO, RegisterDTO } from '~/types'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  initialized: boolean
}

// Clés localStorage
const AUTH_TOKEN_KEY = 'acoustic_club_token'
const AUTH_USER_KEY = 'acoustic_club_user'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isServeur: (state) => state.user?.role === 'SERVEUR' || state.user?.role === 'ADMIN',
    isPremium: (state) => state.user?.role === 'PREMIUM',
    userName: (state) => state.user?.name || 'Invité',
    userRole: (state) => state.user?.role || null
  },

  actions: {
    // Sauvegarder la session dans localStorage
    saveSession(token: string, user: User) {
      if (process.client) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
      }
      this.token = token
      this.user = user
    },

    // Charger la session depuis localStorage
    loadSession() {
      if (process.client) {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        const userStr = localStorage.getItem(AUTH_USER_KEY)
        
        if (token && userStr) {
          try {
            this.token = token
            this.user = JSON.parse(userStr)
          } catch (error) {
            console.error('Erreur lors du chargement de la session:', error)
            this.clearSession()
          }
        }
      }
    },

    // Nettoyer la session
    clearSession() {
      if (process.client) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
      }
      this.token = null
      this.user = null
    },

    async login(credentials: LoginDTO) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch<{ token: string; user: User }>('/api/auth/login', {
          method: 'POST',
          body: credentials
        })

        // Sauvegarder la session complète (token + user)
        this.saveSession(response.token, response.user)

        return { success: true }
      } catch (error: any) {
        // Gestion d'erreur améliorée
        let message = 'Erreur lors de la connexion'
        
        if (error.statusCode === 401) {
          message = 'Email ou mot de passe incorrect'
        } else if (error.statusCode === 422) {
          message = error.data?.message || 'Données invalides'
        } else if (error.data?.message) {
          message = error.data.message
        } else if (error.message) {
          message = error.message
        }

        this.error = message
        
        // Logger en développement
        if (process.dev) {
          console.error('Erreur de connexion:', error)
        }
        
        return { success: false, error: message }
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterDTO) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch<{ token: string; user: User }>('/api/auth/register', {
          method: 'POST',
          body: data
        })

        // Sauvegarder la session complète (token + user)
        this.saveSession(response.token, response.user)

        return { success: true }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de l\'inscription'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      if (!this.token) return

      try {
        const user = await $fetch<User>('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        // Mettre à jour l'utilisateur dans le store et localStorage
        this.user = user
        if (process.client) {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
        }
      } catch (error) {
        // Token invalide, déconnexion
        console.error('Token invalide ou expiré:', error)
        this.logout()
      }
    },

    async logout() {
      // Nettoyer la session
      this.clearSession()
      this.error = null

      // Rediriger vers la page de connexion
      navigateTo('/login')
    },

    // Initialiser l'auth depuis le localStorage
    async initializeAuth() {
      if (this.initialized) return
      
      if (process.client) {
        // Charger la session depuis localStorage
        this.loadSession()
        
        // Si on a un token, vérifier qu'il est toujours valide
        if (this.token) {
          await this.fetchCurrentUser()
        }
        
        this.initialized = true
      }
    },

    // Vérifier si la session est valide
    hasValidSession(): boolean {
      if (process.client) {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        const userStr = localStorage.getItem(AUTH_USER_KEY)
        return !!(token && userStr)
      }
      return false
    }
  }
})

