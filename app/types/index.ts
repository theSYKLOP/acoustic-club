// Types globaux pour l'application Acoustic Club

export type UserRole = 'ADMIN' | 'SERVEUR' | 'CLIENT' | 'PREMIUM'

export type TableStatus = 'LIBRE' | 'OCCUPEE' | 'RESERVEE' | 'HORS_SERVICE'

export type OrderStatus = 'EN_ATTENTE' | 'EN_PREPARATION' | 'PRET' | 'SERVI' | 'ANNULE' | 'PAYE'

export type PaymentMethod = 'ESPECE' | 'CARTE' | 'MOBILE' | 'CHEQUE'

export type PaymentStatus = 'EN_ATTENTE' | 'VALIDE' | 'REFUSE' | 'REMBOURSE'

export type MenuCategory = 'ENTREE' | 'PLAT' | 'DESSERT' | 'BOISSON' | 'ALCOOL' | 'COCKTAIL' | 'SNACK'

export type PremiumTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Table {
  id: string
  number: number
  capacity: number
  status: TableStatus
  location?: string
  qrCode?: string
  createdAt: Date
  updatedAt: Date
}

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  category: MenuCategory
  image?: string
  available: boolean
  prepTime?: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  userId?: string
  tableId: string
  status: OrderStatus
  totalAmount: number
  qrCode?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  items?: OrderItem[]
  table?: Table
  user?: User
}

export interface OrderItem {
  id: string
  orderId: string
  menuId: string
  quantity: number
  price: number
  notes?: string
  menu?: Menu
}

export interface PremiumClient {
  id: string
  userId: string
  points: number
  tier: PremiumTier
  discountPercent: number
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface TableAssignment {
  id: string
  tableId: string
  userId?: string
  serverId: string
  startTime: Date
  endTime?: Date
  guestName?: string
  guestCount: number
  table?: Table
  user?: User
}

export interface Statistics {
  id: string
  date: Date
  totalOrders: number
  totalRevenue: number
  tablesOccupied: number
  averageOrderValue: number
  premiumClients: number
  createdAt: Date
}

// DTOs pour les API

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  email: string
  password: string
  name: string
  phone?: string
}

export interface CreateTableDTO {
  number: number
  capacity: number
  location?: string
}

export interface UpdateTableDTO {
  number?: number
  capacity?: number
  status?: TableStatus
  location?: string
}

export interface CreateMenuDTO {
  name: string
  description?: string
  price: number
  category: MenuCategory
  image?: string
  prepTime?: number
}

export interface UpdateMenuDTO {
  name?: string
  description?: string
  price?: number
  category?: MenuCategory
  image?: string
  available?: boolean
  prepTime?: number
}

export interface CreateOrderDTO {
  tableId: string
  userId?: string
  items: Array<{
    menuId: string
    quantity: number
    notes?: string
  }>
  notes?: string
}

export interface UpdateOrderDTO {
  status?: OrderStatus
  notes?: string
}

export interface AssignTableDTO {
  tableId: string
  userId?: string
  guestName?: string
  guestCount: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

