import type { NuxtError } from '#app'

interface ErrorResponse {
  error: boolean
  statusCode: number
  statusMessage: string
  message: string
  data?: any
}

export const useErrorHandler = () => {
  const { $toast } = useNuxtApp()

  /**
   * Gère les erreurs d'API de manière centralisée
   */
  const handleApiError = (error: any): string => {
    let message = 'Une erreur inattendue s\'est produite'

    if (error.statusCode === 401) {
      message = 'Identifiants incorrects'
    } else if (error.statusCode === 403) {
      message = 'Accès non autorisé'
    } else if (error.statusCode === 404) {
      message = 'Ressource non trouvée'
    } else if (error.statusCode === 422) {
      message = error.data?.message || 'Données invalides'
    } else if (error.statusCode === 500) {
      message = 'Erreur serveur interne'
    } else if (error.data?.message) {
      message = error.data.message
    } else if (error.message) {
      message = error.message
    }

    return message
  }

  /**
   * Gère les erreurs de validation
   */
  const handleValidationError = (error: any): string[] => {
    if (error.data?.errors) {
      return Object.values(error.data.errors).flat() as string[]
    }
    
    if (error.data?.message) {
      return [error.data.message]
    }

    return ['Erreur de validation']
  }

  /**
   * Affiche une notification d'erreur
   */
  const showError = (message: string) => {
    if (process.client) {
      // Utiliser une notification toast si disponible
      if ($toast) {
        $toast.error(message)
      } else {
        // Fallback vers alert si pas de toast
        alert(message)
      }
    }
  }

  /**
   * Affiche une notification de succès
   */
  const showSuccess = (message: string) => {
    if (process.client) {
      if ($toast) {
        $toast.success(message)
      }
    }
  }

  /**
   * Gestionnaire global d'erreurs Nuxt
   */
  const handleGlobalError = (error: NuxtError) => {
    const message = handleApiError(error)
    showError(message)
    
    // Logger l'erreur en développement
    if (process.dev) {
      console.error('Erreur globale:', error)
    }
  }

  /**
   * Wrapper pour les appels API avec gestion d'erreur automatique
   */
  const safeApiCall = async <T>(
    apiCall: () => Promise<T>,
    options: {
      showError?: boolean
      showSuccess?: string
      fallback?: T
    } = {}
  ): Promise<T | null> => {
    try {
      const result = await apiCall()
      
      if (options.showSuccess) {
        showSuccess(options.showSuccess)
      }
      
      return result
    } catch (error: any) {
      const message = handleApiError(error)
      
      if (options.showError !== false) {
        showError(message)
      }
      
      if (process.dev) {
        console.error('Erreur API:', error)
      }
      
      return options.fallback || null
    }
  }

  return {
    handleApiError,
    handleValidationError,
    showError,
    showSuccess,
    handleGlobalError,
    safeApiCall
  }
}

