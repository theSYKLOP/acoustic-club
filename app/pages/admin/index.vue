<template>
  <div>
    <!-- Mobile Title (hidden on desktop) -->
    <div class="lg:hidden mb-6">
      <h1 class="text-2xl font-bold mb-1">Administration</h1>
      <p class="text-sm text-gray-600">Vue d'ensemble du système</p>
    </div>

    <!-- Stats cards - Responsive: 1→2→4 columns -->
    <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
      <!-- Stat Card 1 -->
      <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-3 lg:mb-4">
          <div class="text-3xl lg:text-4xl">🪑</div>
          <div class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs lg:text-sm font-medium">
            {{ tablesStore.occupancyRate }}%
          </div>
        </div>
        <h3 class="text-2xl lg:text-3xl font-bold mb-1">{{ tablesStore.totalTables }}</h3>
        <p class="text-xs lg:text-sm text-gray-600">Tables totales</p>
        <div class="mt-2 text-xs text-gray-500">
          {{ tablesStore.occupiedTables.length }} occupées
        </div>
      </div>

      <!-- Stat Card 2 -->
      <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-3 lg:mb-4">
          <div class="text-3xl lg:text-4xl">📋</div>
          <span class="badge-warning text-xs">Actives</span>
        </div>
        <h3 class="text-2xl lg:text-3xl font-bold mb-1">{{ ordersStore.activeOrders.length }}</h3>
        <p class="text-xs lg:text-sm text-gray-600">Commandes actives</p>
        <div class="mt-2 text-xs text-gray-500">
          {{ ordersStore.todayOrders.length }} aujourd'hui
        </div>
      </div>

      <!-- Stat Card 3 -->
      <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-3 lg:mb-4">
          <div class="text-3xl lg:text-4xl">🍽️</div>
          <span class="badge-info text-xs">Menu</span>
        </div>
        <h3 class="text-2xl lg:text-3xl font-bold mb-1">{{ menusStore.availableMenus.length }}</h3>
        <p class="text-xs lg:text-sm text-gray-600">Items disponibles</p>
        <div class="mt-2 text-xs text-gray-500">
          {{ menusStore.menus.length }} total
        </div>
      </div>

      <!-- Stat Card 4 -->
      <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-3 lg:mb-4">
          <div class="text-3xl lg:text-4xl">💰</div>
          <span class="badge-success text-xs">CA</span>
        </div>
        <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{{ formatPrice(ordersStore.totalRevenue) }}</h3>
        <p class="text-xs lg:text-sm text-gray-600">Chiffre d'affaires</p>
        <div class="mt-2 text-xs text-gray-500">
          Total généré
        </div>
      </div>
    </div>

    <!-- Section Title -->
    <h2 class="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Actions rapides</h2>

    <!-- Actions Grid - Responsive: 1→2→3 columns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      <NuxtLink to="/admin/tables" class="card-hover p-4 sm:p-5 lg:p-6 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">🪑</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Gérer les tables</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Créer, modifier, supprimer</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/menus" class="card-hover p-4 sm:p-5 lg:p-6 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">🍽️</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Gérer le menu</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Ajouter, modifier des plats</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/orders" class="card-hover p-4 sm:p-5 lg:p-6 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">📋</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Voir les commandes</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Historique et suivi</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/users" class="card-hover p-4 sm:p-5 lg:p-6 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">👥</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Utilisateurs</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Gérer les accès</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/stats" class="card-hover p-4 sm:p-5 lg:p-6 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">📈</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Statistiques</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Analyser les performances</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/dashboard" class="card-hover p-4 sm:p-5 lg:p-6 border-2 border-indigo-200 group">
        <div class="flex items-center gap-3 lg:gap-4">
          <div class="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">🏠</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-base lg:text-lg mb-1">Dashboard client</h3>
            <p class="text-xs lg:text-sm text-gray-600 truncate">Vue utilisateur</p>
          </div>
          <div class="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const tablesStore = useTablesStore()
const ordersStore = useOrdersStore()
const menusStore = useMenusStore()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

onMounted(async () => {
  await Promise.all([
    tablesStore.fetchTables(),
    ordersStore.fetchOrders(),
    menusStore.fetchMenus()
  ])
})
</script>

