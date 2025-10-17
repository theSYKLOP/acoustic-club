import { defineStore } from 'pinia'
import type { Order, OrderStatus, CreateOrderDTO, UpdateOrderDTO } from '~/types'

interface OrdersState {
  orders: Order[]
  selectedOrder: Order | null
  loading: boolean
  error: string | null
}

export const useOrdersStore = defineStore('orders', {
  state: (): OrdersState => ({
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null
  }),

  getters: {
    ordersByStatus: (state) => (status: OrderStatus) => {
      return state.orders.filter(order => order.status === status)
    },

    pendingOrders: (state) => {
      return state.orders.filter(o => o.status === 'EN_ATTENTE')
    },

    activeOrders: (state) => {
      return state.orders.filter(o => 
        ['EN_ATTENTE', 'EN_PREPARATION', 'PRET'].includes(o.status)
      )
    },

    completedOrders: (state) => {
      return state.orders.filter(o => o.status === 'PAYE')
    },

    totalRevenue: (state) => {
      return state.orders
        .filter(o => o.status === 'PAYE')
        .reduce((sum, order) => sum + order.totalAmount, 0)
    },

    todayOrders: (state) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      return state.orders.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= today
      })
    }
  },

  actions: {
    async fetchOrders() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        this.orders = await $fetch<Order[]>('/api/orders', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement des commandes'
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        this.selectedOrder = await $fetch<Order>(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors du chargement de la commande'
      } finally {
        this.loading = false
      }
    },

    async createOrder(data: CreateOrderDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const newOrder = await $fetch<Order>('/api/orders', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        this.orders.unshift(newOrder)
        return { success: true, data: newOrder }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la création de la commande'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateOrder(id: string, data: UpdateOrderDTO) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const updatedOrder = await $fetch<Order>(`/api/orders/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: data
        })

        const index = this.orders.findIndex(o => o.id === id)
        if (index !== -1) {
          this.orders[index] = updatedOrder
        }

        return { success: true, data: updatedOrder }
      } catch (error: any) {
        this.error = error.data?.message || 'Erreur lors de la mise à jour de la commande'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(id: string, status: OrderStatus) {
      return this.updateOrder(id, { status })
    },

    async cancelOrder(id: string) {
      return this.updateOrderStatus(id, 'ANNULE')
    }
  }
})

