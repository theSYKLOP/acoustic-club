<template>
  <div class="card-base overflow-hidden hover:shadow-lg transition-shadow">
    <div v-if="menu.image" class="h-48 bg-gray-200 overflow-hidden">
      <img :src="menu.image" :alt="menu.name" class="w-full h-full object-cover" />
    </div>
    <div v-else class="h-48 bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
      <span class="text-6xl">{{ getCategoryIcon(menu.category) }}</span>
    </div>

    <div class="p-6">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-xl font-bold">{{ menu.name }}</h3>
        <span class="badge-primary text-lg font-bold">
          {{ formatPrice(menu.price) }}
        </span>
      </div>

      <p v-if="menu.description" class="text-gray-600 text-sm mb-4">
        {{ menu.description }}
      </p>

      <div class="flex items-center gap-4 text-xs text-gray-500">
        <span class="badge-neutral">{{ getCategoryLabel(menu.category) }}</span>
        <span v-if="menu.prepTime" class="flex items-center gap-1">
          ⏱️ {{ menu.prepTime }} min
        </span>
        <span v-if="!menu.available" class="badge-danger">
          Indisponible
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu, MenuCategory } from '~/types'

interface Props {
  menu: Menu
}

const props = defineProps<Props>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getCategoryIcon = (category: MenuCategory) => {
  const icons: Record<MenuCategory, string> = {
    'ENTREE': '🥗',
    'PLAT': '🍽️',
    'DESSERT': '🍰',
    'BOISSON': '🥤',
    'ALCOOL': '🍷',
    'COCKTAIL': '🍹',
    'SNACK': '🍿'
  }
  return icons[category] || '🍽️'
}

const getCategoryLabel = (category: MenuCategory) => {
  const labels: Record<MenuCategory, string> = {
    'ENTREE': 'Entrée',
    'PLAT': 'Plat',
    'DESSERT': 'Dessert',
    'BOISSON': 'Boisson',
    'ALCOOL': 'Alcool',
    'COCKTAIL': 'Cocktail',
    'SNACK': 'Snack'
  }
  return labels[category] || category
}
</script>

