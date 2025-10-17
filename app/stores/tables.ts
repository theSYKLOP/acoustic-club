import { defineStore } from 'pinia'
import type { Table, TableStatus, CreateTableDTO, UpdateTableDTO } from '~/types'

interface TablesState {
  tables: Table[]
  selectedTable: Table | null
  loading: boolean
  error: string | null
}

export const useTablesStore = defineStore('tables', {
  state: (): TablesState => ({
    tables: [],
    selectedTable: null,
    loading: false,
    error: null
  }),

  getters: {
    tablesByStatus: (state) => (status: TableStatus) => {
      return state.tables.filter(table => table.status === status)
    },
    
    freeTables: (state) => {
      return state.tables.filter(table => table.status === 'LIBRE')
    },

    occupiedTables: (state) => {
      return state.tables.filter(table => table.status === 'OCCUPEE')
    },

    reservedTables: (state) => {
      return state.tables.filter(table => table.status === 'RESERVEE')
    },

    totalTables: (state) => state.tables.length,

    occupancyRate: (state) => {
      if (state.tables.length === 0) return 0
      const occupied = state.tables.filter(t => t.status === 'OCCUPEE').length
      return Math.round((occupied / state.tables.length) * 100)
    }
  },

  actions: {
    async fetchTables() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        this.tables = await $fetch<Table[]>('/api/tables', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement des tables'
      } finally {
        this.loading = false
      }
    },

    async fetchTable(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        this.selectedTable = await $fetch<Table>(`/api/tables/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement de la table'
      } finally {
        this.loading = false
      }
    },

    async createTable(data: CreateTableDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const newTable = await $fetch<Table>('/api/tables', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        this.tables.push(newTable)
        return { success: true, data: newTable }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la création de la table'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateTable(id: string, data: UpdateTableDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const updatedTable = await $fetch<Table>(`/api/tables/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        const index = this.tables.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tables[index] = updatedTable
        }

        return { success: true, data: updatedTable }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la mise à jour de la table'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteTable(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        await $fetch(`/api/tables/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        this.tables = this.tables.filter(t => t.id !== id)
        return { success: true }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la suppression de la table'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateTableStatus(id: string, status: TableStatus) {
      return this.updateTable(id, { status })
    }
  }
})

