<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-base px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Header -->
      <div class="mb-6 lg:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Interface Serveur 👨‍💼</h1>
        <p class="text-sm lg:text-base text-gray-600">Gérez les attributions de tables et prenez les commandes</p>
      </div>

      <!-- Stats rapides - Responsive: 1→2→3 columns -->
      <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
          <div class="text-2xl sm:text-3xl mb-2 lg:mb-3">🪑</div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ tablesStore.freeTables.length }}</h3>
          <p class="text-xs lg:text-sm text-gray-600">Tables libres</p>
          <div class="mt-2 text-xs text-gray-500">
            {{ tablesStore.totalTables }} au total
          </div>
        </div>

        <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow">
          <div class="text-2xl sm:text-3xl mb-2 lg:mb-3">📋</div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ ordersStore.pendingOrders.length }}</h3>
          <p class="text-xs lg:text-sm text-gray-600">Commandes en attente</p>
          <div class="mt-2 text-xs text-gray-500">
            À traiter
          </div>
        </div>

        <div class="card-base p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-shadow xs:col-span-2 lg:col-span-1">
          <div class="text-2xl sm:text-3xl mb-2 lg:mb-3">✅</div>
          <h3 class="text-xl sm:text-2xl font-bold mb-1">{{ ordersStore.todayOrders.length }}</h3>
          <p class="text-xs lg:text-sm text-gray-600">Commandes du jour</p>
          <div class="mt-2 text-xs text-gray-500">
            Total aujourd'hui
          </div>
        </div>
      </div>

      <!-- Vue d'ensemble des tables -->
      <div class="card-base p-4 sm:p-5 lg:p-6 mb-6 lg:mb-8">
        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-4 lg:mb-6">État des tables</h2>
        
        <!-- Tables Grid - Responsive: 1→2→3→4 columns -->
        <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <div
            v-for="table in tablesStore.tables"
            :key="table.id"
            :class="[
              'p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md',
              getTableCardClass(table.status)
            ]"
            @click="selectTable(table)"
          >
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-base sm:text-lg lg:text-xl font-bold">Table {{ table.number }}</h3>
              <span :class="['badge-base text-xs', getStatusBadgeClass(table.status)]">
                {{ getStatusLabel(table.status) }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-gray-600">
              👥 {{ table.capacity }} pers.
            </p>
            <p v-if="table.location" class="text-xs text-gray-500 mt-1">
              📍 {{ table.location }}
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tablesStore.tables.length === 0" class="text-center py-12">
          <div class="text-4xl lg:text-5xl mb-3">🪑</div>
          <p class="text-sm lg:text-base text-gray-600">Aucune table disponible</p>
        </div>
      </div>

      <!-- Commandes actives -->
      <div class="card-base p-4 sm:p-5 lg:p-6">
        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Commandes actives</h2>
        
        <!-- Empty State -->
        <div v-if="ordersStore.activeOrders.length === 0" class="text-center py-8 lg:py-12">
          <div class="text-4xl lg:text-5xl mb-3">📋</div>
          <p class="text-sm lg:text-base text-gray-600">Aucune commande active</p>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-3 sm:space-y-4">
          <div
            v-for="order in ordersStore.activeOrders"
            :key="order.id"
            class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
          >
            <!-- Order Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-base lg:text-lg">Commande {{ order.orderNumber }}</h3>
                <p class="text-xs lg:text-sm text-gray-600">
                  Table {{ order.table?.number }} • {{ formatDate(order.createdAt) }}
                </p>
              </div>
              <div class="flex items-center gap-3 sm:flex-shrink-0">
                <span :class="['badge-base text-xs', getOrderStatusBadgeClass(order.status)]">
                  {{ getOrderStatusLabel(order.status) }}
                </span>
                <p class="font-bold text-base lg:text-lg">{{ formatPrice(order.totalAmount) }}</p>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="flex flex-wrap gap-2">
              <button
                v-if="order.status === 'EN_ATTENTE'"
                @click="updateOrderStatus(order.id, 'EN_PREPARATION')"
                class="btn-warning btn-sm text-xs lg:text-sm flex-1 xs:flex-none"
              >
                ⏳ En préparation
              </button>
              <button
                v-if="order.status === 'EN_PREPARATION'"
                @click="updateOrderStatus(order.id, 'PRET')"
                class="btn-info btn-sm text-xs lg:text-sm flex-1 xs:flex-none"
              >
                ✅ Marquer prêt
              </button>
              <button
                v-if="order.status === 'PRET'"
                @click="updateOrderStatus(order.id, 'SERVI')"
                class="btn-success btn-sm text-xs lg:text-sm flex-1 xs:flex-none"
              >
                🍽️ Marquer servi
              </button>
              <button
                v-if="order.status === 'SERVI'"
                @click="updateOrderStatus(order.id, 'PAYE')"
                class="btn-primary btn-sm text-xs lg:text-sm flex-1 xs:flex-none"
              >
                💰 Marquer payé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Table, TableStatus, OrderStatus } from '~/types'

definePageMeta({
  middleware: 'serveur'
})

const tablesStore = useTablesStore()
const ordersStore = useOrdersStore()

const selectTable = (table: Table) => {
  navigateTo(`/tables/${table.id}`)
}

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  await ordersStore.updateOrderStatus(orderId, status)
  await ordersStore.fetchOrders()
}

const getTableCardClass = (status: TableStatus) => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'border-green-500 bg-green-50 hover:bg-green-100',
    'OCCUPEE': 'border-red-500 bg-red-50 hover:bg-red-100',
    'RESERVEE': 'border-orange-500 bg-orange-50 hover:bg-orange-100',
    'HORS_SERVICE': 'border-gray-300 bg-gray-50 opacity-60'
  }
  return classes[status]
}

const getStatusBadgeClass = (status: TableStatus) => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'badge-success',
    'OCCUPEE': 'badge-danger',
    'RESERVEE': 'badge-warning',
    'HORS_SERVICE': 'badge-neutral'
  }
  return classes[status]
}

const getStatusLabel = (status: TableStatus) => {
  const labels: Record<TableStatus, string> = {
    'LIBRE': 'Libre',
    'OCCUPEE': 'Occupée',
    'RESERVEE': 'Réservée',
    'HORS_SERVICE': 'Hors service'
  }
  return labels[status]
}

const getOrderStatusBadgeClass = (status: OrderStatus) => {
  const classes: Record<OrderStatus, string> = {
    'EN_ATTENTE': 'badge-warning',
    'EN_PREPARATION': 'badge-info',
    'PRET': 'badge-primary',
    'SERVI': 'badge-success',
    'ANNULE': 'badge-danger',
    'PAYE': 'badge-success'
  }
  return classes[status]
}

const getOrderStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    'EN_ATTENTE': 'En attente',
    'EN_PREPARATION': 'En préparation',
    'PRET': 'Prêt',
    'SERVI': 'Servi',
    'ANNULE': 'Annulé',
    'PAYE': 'Payé'
  }
  return labels[status]
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

onMounted(async () => {
  await Promise.all([
    tablesStore.fetchTables(),
    ordersStore.fetchOrders()
  ])
})
</script>

