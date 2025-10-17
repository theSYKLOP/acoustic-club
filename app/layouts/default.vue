<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header Responsive -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-base sm:text-xl">AC</span>
            </div>
            <span class="hidden sm:inline text-lg sm:text-xl font-bold text-gradient">Acoustic Club</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav v-if="isAuthenticated" class="hidden lg:flex items-center gap-1">
            <NuxtLink 
              to="/dashboard" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Dashboard
            </NuxtLink>
            
            <NuxtLink 
              v-if="isServeur" 
              to="/serveur" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Service
            </NuxtLink>
            
            <NuxtLink 
              v-if="isAdmin" 
              to="/admin" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Admin
            </NuxtLink>

            <NuxtLink 
              to="/tables" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Tables
            </NuxtLink>
          </nav>

          <!-- User Menu & Auth Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Desktop User Menu -->
            <div v-if="isAuthenticated" class="hidden md:flex items-center gap-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                <p class="text-xs text-gray-500">{{ userRole }}</p>
              </div>
              <button 
                @click="handleLogout" 
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Déconnexion
              </button>
            </div>

            <!-- Mobile Auth Links -->
            <div v-if="!isAuthenticated" class="flex items-center gap-2">
              <NuxtLink 
                to="/login" 
                class="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Connexion
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Inscription
              </NuxtLink>
            </div>

            <!-- Mobile Menu Button -->
            <button 
              v-if="isAuthenticated"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <nav v-if="mobileMenuOpen && isAuthenticated" class="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2">
            <NuxtLink 
              to="/dashboard" 
              class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              📊 Dashboard
            </NuxtLink>
            
            <NuxtLink 
              v-if="isServeur" 
              to="/serveur" 
              class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              👨‍💼 Service
            </NuxtLink>
            
            <NuxtLink 
              v-if="isAdmin" 
              to="/admin" 
              class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              ⚙️ Administration
            </NuxtLink>

            <NuxtLink 
              to="/tables" 
              class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              🪑 Tables
            </NuxtLink>

            <div class="border-t border-gray-200 pt-4 mt-4">
              <p class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{{ userName }}</p>
              <button 
                @click="handleLogout"
                class="w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
              >
                🚪 Déconnexion
              </button>
            </div>
          </nav>
        </transition>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            © {{ new Date().getFullYear() }} Acoustic Club. Tous droits réservés.
          </p>
          <div class="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <a href="#" class="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              Confidentialité
            </a>
            <a href="#" class="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              CGU
            </a>
            <a href="#" class="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Utiliser le composable d'authentification
const auth = useAuth()
const mobileMenuOpen = ref(false)

// Computed properties réactifs - se mettent à jour automatiquement
const isAuthenticated = auth.isAuthenticated
const isServeur = auth.isServeur
const isAdmin = auth.isAdmin
const userName = auth.userName
const userRole = auth.userRole

const handleLogout = async () => {
  mobileMenuOpen.value = false
  await auth.logout()
}

// Fermer le menu mobile lors de la navigation
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})

// Le plugin auth-init.client.ts gère l'initialisation automatiquement
</script>

