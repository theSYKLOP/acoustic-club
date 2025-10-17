<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Tables</h1>
        <p class="text-sm sm:text-base text-gray-600">
          Visualisez l'état de toutes les tables en temps réel
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Actions Bar -->
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="text-sm text-gray-600">
          {{ tablesStore.totalTables }} table(s) au total
        </div>
        <button
          v-if="auth.isAdmin.value || auth.isServeur.value"
          @click="openCreateModal"
          class="btn-primary flex items-center gap-2 w-full sm:w-auto"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Créer une table</span>
        </button>
      </div>

      <!-- Filters - Responsive horizontal scroll on mobile -->
      <div class="mb-8 -mx-4 sm:mx-0 overflow-x-auto sm:overflow-visible">
        <div class="flex sm:flex-wrap gap-2 sm:gap-3 px-4 sm:px-0 min-w-max sm:min-w-0">
          <button
            @click="filterStatus = null"
            :class="[
              'btn-base shrink-0 text-xs sm:text-sm whitespace-nowrap',
              filterStatus === null ? 'btn-primary' : 'btn-outline'
            ]"
          >
            Toutes ({{ tablesStore.totalTables }})
          </button>

          <button
            @click="filterStatus = 'LIBRE'"
            :class="[
              'btn-base shrink-0 text-xs sm:text-sm whitespace-nowrap',
              filterStatus === 'LIBRE' ? 'btn-success' : 'btn-outline'
            ]"
          >
            Libres ({{ tablesStore.freeTables.length }})
          </button>

          <button
            @click="filterStatus = 'OCCUPEE'"
            :class="[
              'btn-base shrink-0 text-xs sm:text-sm whitespace-nowrap',
              filterStatus === 'OCCUPEE' ? 'btn-danger' : 'btn-outline'
            ]"
          >
            Occupées ({{ tablesStore.occupiedTables.length }})
          </button>

          <button
            @click="filterStatus = 'RESERVEE'"
            :class="[
              'btn-base shrink-0 text-xs sm:text-sm whitespace-nowrap',
              filterStatus === 'RESERVEE' ? 'btn-warning' : 'btn-outline'
            ]"
          >
            Réservées ({{ tablesStore.reservedTables.length }})
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="spinner mr-3" />
        <span class="text-gray-600">Chargement...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTables.length === 0" class="text-center py-20">
        <p class="text-lg text-gray-600">Aucune table trouvée</p>
      </div>

      <!-- Tables Grid - Responsive layout -->
      <div
        v-else
        class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
      >
        <button
          v-for="table in filteredTables"
          :key="table.id"
          :class="['card-base p-3 sm:p-4 lg:p-6 cursor-pointer transition-all text-left', getTableCardClass(table.status)]"
          @click="selectTable(table)"
        >
          <div class="flex justify-between items-start mb-3 gap-2">
            <h3 class="text-base sm:text-lg lg:text-xl font-bold">Table {{ table.number }}</h3>
            <span :class="['badge-base text-xs', getStatusBadgeClass(table.status)]">
              {{ getStatusLabel(table.status) }}
            </span>
          </div>

          <div class="space-y-1 text-xs sm:text-sm">
            <p class="text-gray-700">👥 {{ table.capacity }} pers.</p>
            <p v-if="table.location" class="text-gray-600">📍 {{ table.location }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Table Modal (Créer, Voir, Modifier) -->
    <TableModal
      v-if="modalState.isOpen"
      :is-open="modalState.isOpen"
      :mode="modalState.mode"
      :table="modalState.table"
      :can-edit="auth.isAdmin.value || auth.isServeur.value"
      :can-change-status="auth.isAdmin.value || auth.isServeur.value"
      @close="closeModal"
      @save="handleSave"
      @status-change="handleStatusChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Table, TableStatus } from '~/types'

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
const tablesStore = useTablesStore()

const filterStatus = ref<TableStatus | null>(null)
const loading = ref(true)

// État du modal
const modalState = reactive({
  isOpen: false,
  mode: 'view' as 'view' | 'edit' | 'create',
  table: null as Table | null
})

const filteredTables = computed(() => {
  if (!filterStatus.value) return tablesStore.tables
  return tablesStore.tablesByStatus(filterStatus.value)
})

const getTableCardClass = (status: TableStatus): string => {
  const map: Record<TableStatus, string> = {
    'LIBRE': 'border-l-4 border-green-500 bg-green-50 hover:bg-green-100',
    'OCCUPEE': 'border-l-4 border-red-500 bg-red-50 hover:bg-red-100',
    'RESERVEE': 'border-l-4 border-orange-500 bg-orange-50 hover:bg-orange-100',
    'HORS_SERVICE': 'border-l-4 border-gray-500 bg-gray-50 hover:bg-gray-100'
  }
  return map[status] || ''
}

const getStatusBadgeClass = (status: TableStatus): string => {
  const map: Record<TableStatus, string> = {
    'LIBRE': 'badge-success',
    'OCCUPEE': 'badge-danger',
    'RESERVEE': 'badge-warning',
    'HORS_SERVICE': 'badge-gray'
  }
  return map[status] || ''
}

const getStatusLabel = (status: TableStatus): string => {
  const map: Record<TableStatus, string> = {
    'LIBRE': 'Libre',
    'OCCUPEE': 'Occupée',
    'RESERVEE': 'Réservée',
    'HORS_SERVICE': 'H.S.'
  }
  return map[status] || ''
}

// Fonctions modal
const openCreateModal = () => {
  modalState.isOpen = true
  modalState.mode = 'create'
  modalState.table = null
}

const selectTable = (table: Table) => {
  modalState.isOpen = true
  modalState.mode = 'view'
  modalState.table = table
}

const closeModal = () => {
  modalState.isOpen = false
  modalState.table = null
}

const handleSave = async (data: Partial<Table>) => {
  try {
    if (modalState.mode === 'create') {
      // Créer une nouvelle table
      await tablesStore.createTable({
        number: data.number!,
        capacity: data.capacity!,
        location: data.location
      })
    } else if (modalState.mode === 'edit' && modalState.table) {
      // Mettre à jour la table existante
      await tablesStore.updateTable(modalState.table.id.toString(), data)
    }
    await tablesStore.fetchTables()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  }
}

const handleStatusChange = async (tableId: number, newStatus: TableStatus) => {
  try {
    await tablesStore.updateTable(tableId.toString(), { status: newStatus })
    await tablesStore.fetchTables()
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error)
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await tablesStore.fetchTables()
  } catch (error) {
    console.error('Erreur lors du chargement des tables:', error)
  } finally {
    loading.value = false
  }
})
</script>
