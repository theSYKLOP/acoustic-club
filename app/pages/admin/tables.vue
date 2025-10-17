<template>
  <div>
    <!-- Mobile Title + Button -->
    <div class="lg:hidden mb-6">
      <h1 class="text-2xl font-bold mb-4">Gestion des tables</h1>
    </div>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 lg:mb-6">
      <h2 class="hidden lg:block text-xl lg:text-2xl font-bold">Liste des tables</h2>
      <button 
        @click="openCreateModal" 
        class="w-full sm:w-auto btn-primary text-sm lg:text-base"
      >
        <span class="text-lg">+</span>
        <span>Nouvelle table</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12 lg:py-20">
      <div class="spinner mb-3"></div>
      <span class="text-sm lg:text-base text-gray-600">Chargement...</span>
    </div>

    <!-- Content Wrapper -->
    <template v-else>
      <!-- Desktop Table View (hidden on mobile) -->
      <div class="hidden lg:block card-base overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table-base">
            <thead>
              <tr>
                <th class="w-32">Numéro</th>
                <th class="w-32">Capacité</th>
                <th>Zone</th>
                <th class="w-40">Statut</th>
                <th class="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="table in tablesStore.tables" :key="table.id" class="hover:bg-gray-50">
                <td class="font-bold">Table {{ table.number }}</td>
                <td>👥 {{ table.capacity }} pers.</td>
                <td class="text-gray-600">{{ table.location || '-' }}</td>
                <td>
                  <span :class="['badge-base', getStatusBadgeClass(table.status)]">
                    {{ getStatusLabel(table.status) }}
                  </span>
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <button
                      @click="openViewModal(table)"
                      class="btn-ghost btn-sm btn-icon"
                      title="Voir les détails"
                    >
                      👁️
                    </button>
                    <button
                      @click="openEditModal(table)"
                      class="btn-ghost btn-sm btn-icon"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteTableConfirm(table)"
                      class="btn-ghost btn-sm btn-icon text-red-600 hover:bg-red-50"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Cards View (hidden on desktop) -->
      <div class="lg:hidden space-y-3">
        <div
          v-for="table in tablesStore.tables"
          :key="table.id"
          @click="openViewModal(table)"
          class="card-base p-4 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-bold text-lg mb-1">Table {{ table.number }}</h3>
              <p class="text-sm text-gray-600">
                👥 {{ table.capacity }} personnes
              </p>
            </div>
            <span :class="['badge-base text-xs', getStatusBadgeClass(table.status)]">
              {{ getStatusLabel(table.status) }}
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              📍 {{ table.location || 'Non défini' }}
            </div>
            <div class="flex items-center gap-2">
              <button
                @click.stop="openEditModal(table)"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                @click.stop="deleteTableConfirm(table)"
                class="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tablesStore.tables.length === 0" class="text-center py-12">
          <div class="text-5xl mb-3">🪑</div>
          <p class="text-gray-600 mb-4">Aucune table créée</p>
          <button @click="openCreateModal" class="btn-primary">
            Créer la première table
          </button>
        </div>
      </div>
    </template>

    <!-- TableModal Component -->
    <TableModal
      :is-open="modalState.isOpen"
      :mode="modalState.mode"
      :table="modalState.table"
      @close="closeModal"
      @save="handleSave"
      @status-change="handleStatusChange"
    />

    <!-- ConfirmModal for Delete -->
    <ConfirmModal
      :is-open="showDeleteConfirm"
      title="Supprimer la table"
      subtitle="Cette action est irréversible"
      :message="`Êtes-vous sûr de vouloir supprimer la table ${tableToDelete?.number} ?`"
      details="Toutes les données associées seront également supprimées."
      confirm-text="Supprimer"
      :is-destructive="true"
      @close="showDeleteConfirm = false"
      @confirm="performDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Table, TableStatus } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const tablesStore = useTablesStore()

const loading = ref(true)
const showDeleteConfirm = ref(false)
const tableToDelete = ref<Table | null>(null)

// Modal state
const modalState = reactive({
  isOpen: false,
  mode: 'view' as 'view' | 'edit' | 'create',
  table: null as Table | null
})

const openCreateModal = () => {
  modalState.isOpen = true
  modalState.mode = 'create'
  modalState.table = null
}

const openViewModal = (table: Table) => {
  modalState.isOpen = true
  modalState.mode = 'view'
  modalState.table = table
}

const openEditModal = (table: Table) => {
  modalState.isOpen = true
  modalState.mode = 'edit'
  modalState.table = table
}

const closeModal = () => {
  modalState.isOpen = false
}

const handleSave = async (data: Partial<Table>) => {
  try {
    if (modalState.mode === 'create') {
      await tablesStore.createTable({
        number: data.number!,
        capacity: data.capacity!,
        location: data.location
      })
    } else if (modalState.table) {
      await tablesStore.updateTable(modalState.table.id, data)
    }
    await tablesStore.fetchTables()
    closeModal()
  } catch (error: any) {
    console.error('Error saving table:', error)
  }
}

const handleStatusChange = async (tableId: number, status: TableStatus) => {
  try {
    await tablesStore.updateTable(tableId.toString(), { status })
    await tablesStore.fetchTables()
  } catch (error: any) {
    console.error('Error changing status:', error)
  }
}

const deleteTableConfirm = (table: Table) => {
  tableToDelete.value = table
  showDeleteConfirm.value = true
}

const performDelete = async () => {
  if (tableToDelete.value) {
    await tablesStore.deleteTable(tableToDelete.value.id)
    await tablesStore.fetchTables()
    showDeleteConfirm.value = false
    tableToDelete.value = null
  }
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

onMounted(async () => {
  await tablesStore.fetchTables()
  loading.value = false
})
</script>

