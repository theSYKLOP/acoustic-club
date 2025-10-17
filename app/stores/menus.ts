import { defineStore } from 'pinia'
import type { Menu, MenuCategory, CreateMenuDTO, UpdateMenuDTO } from '~/types'

interface MenusState {
  menus: Menu[]
  selectedMenu: Menu | null
  loading: boolean
  error: string | null
}

export const useMenusStore = defineStore('menus', {
  state: (): MenusState => ({
    menus: [],
    selectedMenu: null,
    loading: false,
    error: null
  }),

  getters: {
    menusByCategory: (state) => (category: MenuCategory) => {
      return state.menus.filter(menu => menu.category === category && menu.available)
    },

    availableMenus: (state) => {
      return state.menus.filter(menu => menu.available)
    },

    entrées: (state) => {
      return state.menus.filter(m => m.category === 'ENTREE' && m.available)
    },

    plats: (state) => {
      return state.menus.filter(m => m.category === 'PLAT' && m.available)
    },

    desserts: (state) => {
      return state.menus.filter(m => m.category === 'DESSERT' && m.available)
    },

    boissons: (state) => {
      return state.menus.filter(m => 
        ['BOISSON', 'ALCOOL', 'COCKTAIL'].includes(m.category) && m.available
      )
    }
  },

  actions: {
    async fetchMenus() {
      this.loading = true
      this.error = null

      try {
        this.menus = await $fetch<Menu[]>('/api/menus')
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement du menu'
      } finally {
        this.loading = false
      }
    },

    async fetchMenu(id: string) {
      this.loading = true
      this.error = null

      try {
        this.selectedMenu = await $fetch<Menu>(`/api/menus/${id}`)
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement du plat'
      } finally {
        this.loading = false
      }
    },

    async createMenu(data: CreateMenuDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const newMenu = await $fetch<Menu>('/api/menus', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        this.menus.push(newMenu)
        return { success: true, data: newMenu }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la création du plat'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateMenu(id: string, data: UpdateMenuDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const updatedMenu = await $fetch<Menu>(`/api/menus/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        const index = this.menus.findIndex(m => m.id === id)
        if (index !== -1) {
          this.menus[index] = updatedMenu
        }

        return { success: true, data: updatedMenu }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la mise à jour du plat'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteMenu(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        await $fetch(`/api/menus/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        this.menus = this.menus.filter(m => m.id !== id)
        return { success: true }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la suppression du plat'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})

