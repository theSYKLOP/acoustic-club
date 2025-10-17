<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Bienvenue, {{ authStore.userName }} 👋
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Gérez vos commandes et consultez l'état des tables
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Stats Grid - Responsive: 1 col mobile → 2 col tablet → 4 col desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <!-- Stat Card 1 -->
        <div class="card-base p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl sm:text-3xl">🪑</div>
            <span class="badge-info text-xs sm:text-sm">{{ tablesStore.occupancyRate }}%</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ tablesStore.occupiedTables.length }}</h3>
          <p class="text-xs sm:text-sm text-gray-600">Tables occupées</p>
        </div>

        <!-- Stat Card 2 -->
        <div class="card-base p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl sm:text-3xl">📋</div>
            <span class="badge-warning text-xs sm:text-sm">En cours</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ ordersStore.activeOrders.length }}</h3>
          <p class="text-xs sm:text-sm text-gray-600">Commandes actives</p>
        </div>

        <!-- Stat Card 3 -->
        <div class="card-base p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl sm:text-3xl">✅</div>
            <span class="badge-success text-xs sm:text-sm">Aujourd'hui</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ ordersStore.todayOrders.length }}</h3>
          <p class="text-xs sm:text-sm text-gray-600">Commandes du jour</p>
        </div>

        <!-- Stat Card 4 -->
        <div class="card-base p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl sm:text-3xl">💰</div>
            <span class="badge-success text-xs sm:text-sm">Total</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ formatPrice(ordersStore.totalRevenue) }}</h3>
          <p class="text-xs sm:text-sm text-gray-600">Chiffre d'affaires</p>
        </div>
      </div>

      <!-- Navigation rapide Grid - Responsive: 1 col mobile → 2 col tablet → 3 col desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <!-- Quick Nav Item 1 -->
        <NuxtLink to="/tables" class="card-hover p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-200 group">
          <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">🪑</div>
          <h3 class="text-lg sm:text-xl font-bold mb-2">Voir les tables</h3>
          <p class="text-xs sm:text-sm text-gray-600">Consultez l'état de toutes les tables</p>
        </NuxtLink>

        <!-- Quick Nav Item 2 -->
        <NuxtLink to="/menus" class="card-hover p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-200 group">
          <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">🍽️</div>
          <h3 class="text-lg sm:text-xl font-bold mb-2">Menu</h3>
          <p class="text-xs sm:text-sm text-gray-600">Découvrez notre carte</p>
        </NuxtLink>

        <!-- Quick Nav Item 3 - Serveur -->
        <NuxtLink 
          v-if="authStore.isServeur"
          to="/serveur" 
          class="card-hover p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-200 group sm:col-span-2 lg:col-span-1"
        >
          <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍💼</div>
          <h3 class="text-lg sm:text-xl font-bold mb-2">Service</h3>
          <p class="text-xs sm:text-sm text-gray-600">Gérer les tables et commandes</p>
        </NuxtLink>

        <!-- Quick Nav Item 4 - Admin -->
        <NuxtLink 
          v-if="authStore.isAdmin"
          to="/admin" 
          class="card-highlight p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-200 group sm:col-span-2 lg:col-span-1"
        >
          <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
          <h3 class="text-lg sm:text-xl font-bold mb-2">Administration</h3>
          <p class="text-xs sm:text-sm text-gray-600">Accéder au panneau admin</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const tablesStore = useTablesStore()
const ordersStore = useOrdersStore()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Charger les données au montage
onMounted(async () => {
  await Promise.all([
    tablesStore.fetchTables(),
    ordersStore.fetchOrders()
  ])
})
</script>

