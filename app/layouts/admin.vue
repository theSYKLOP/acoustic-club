<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <header class="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="flex items-center justify-between px-4 py-3">
        <button 
          @click="sidebarOpen = !sidebarOpen" 
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">AC</span>
          </div>
          <span class="text-sm font-bold text-gradient">Admin</span>
        </NuxtLink>

        <button 
          @click="handleLogout" 
          class="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
          title="Déconnexion"
        >
          🚪
        </button>
      </div>
    </header>

    <!-- Overlay Mobile -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false"
      class="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-50 transition-transform duration-300',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-4 lg:p-6">
        <!-- Desktop Logo -->
        <NuxtLink to="/" class="hidden lg:flex items-center gap-3 mb-8">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">AC</span>
          </div>
          <span class="text-lg font-bold text-gradient">Admin</span>
        </NuxtLink>

        <!-- Mobile User Info -->
        <div class="lg:hidden mb-6 p-3 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
          <p class="text-xs text-gray-500">Administrateur</p>
        </div>

        <nav class="space-y-1">
          <NuxtLink 
            v-for="item in navItems"
            :key="item.to"
            :to="item.to" 
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium text-sm lg:text-base"
            active-class="bg-indigo-50 text-indigo-600"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-4 lg:p-6 border-t border-gray-200 bg-white">
        <button 
          @click="handleLogout" 
          class="w-full btn-outline text-sm lg:text-base"
        >
          🚪 Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:ml-64 pt-14 lg:pt-0">
      <!-- Desktop Header -->
      <header class="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-20">
        <div class="px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl lg:text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
              <p class="text-xs lg:text-sm text-gray-600 mt-1">{{ userName }}</p>
            </div>
            <NuxtLink to="/dashboard" class="btn-ghost text-sm lg:text-base">
              🏠 Dashboard
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const sidebarOpen = ref(false)

const userName = computed(() => authStore.userName || 'Admin')

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'Administration',
    '/admin/tables': 'Gestion des tables',
    '/admin/menus': 'Gestion des menus',
    '/admin/orders': 'Gestion des commandes',
    '/admin/users': 'Gestion des utilisateurs',
    '/admin/stats': 'Statistiques'
  }
  return titles[route.path] || 'Administration'
})

const navItems = [
  { to: '/admin', icon: '📊', label: 'Dashboard' },
  { to: '/admin/tables', icon: '🪑', label: 'Tables' },
  { to: '/admin/menus', icon: '🍽️', label: 'Menus' },
  { to: '/admin/orders', icon: '📋', label: 'Commandes' },
  { to: '/admin/users', icon: '👥', label: 'Utilisateurs' },
  { to: '/admin/stats', icon: '📈', label: 'Statistiques' }
]

const handleLogout = async () => {
  await authStore.logout()
}

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>

