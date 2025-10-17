export default defineNuxtPlugin((nuxtApp) => {
  // Gestionnaire d'erreur global pour le client
  nuxtApp.hook('app:error', (error) => {
    console.error('Erreur globale:', error)
    
    // Afficher une notification d'erreur utilisateur-friendly
    if (error.statusCode === 404) {
      // Ne pas afficher d'erreur pour les 404 de navigation
      return
    }
    
    // Pour les autres erreurs, afficher un message générique
    if (process.client && typeof window !== 'undefined') {
      // Utiliser une notification toast si disponible
      const toast = document.querySelector('[data-toast]')
      if (toast) {
        // Si un système de toast est disponible
        console.log('Affichage toast d\'erreur')
      } else {
        // Fallback vers une notification simple
        console.error('Une erreur s\'est produite:', error.message || 'Erreur inconnue')
      }
    }
  })

  // Gestionnaire pour les erreurs non capturées
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Promesse rejetée non gérée:', event.reason)
      
      // Empêcher l'affichage de l'erreur par défaut
      event.preventDefault()
      
      // Afficher un message d'erreur utilisateur-friendly
      console.error('Une erreur inattendue s\'est produite. Veuillez réessayer.')
    })

    window.addEventListener('error', (event) => {
      console.error('Erreur JavaScript non gérée:', event.error)
      
      // Empêcher l'affichage de l'erreur par défaut
      event.preventDefault()
    })
  }
})

