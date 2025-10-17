<template>
  <div
    :class="[
      'card-base p-6 cursor-pointer transition-all duration-200',
      statusClass
    ]"
    @click="$emit('click')"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-2xl font-bold">Table {{ table.number }}</h3>
      <span :class="['badge-base', badgeClass]">
        {{ statusLabel }}
      </span>
    </div>

    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2 text-gray-600">
        <span>👥</span>
        <span>Capacité : {{ table.capacity }} pers.</span>
      </div>
      <div v-if="table.location" class="flex items-center gap-2 text-gray-600">
        <span>📍</span>
        <span>{{ table.location }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Table, TableStatus } from '~/types'

interface Props {
  table: Table
}

const props = defineProps<Props>()

defineEmits<{
  click: []
}>()

const statusClass = computed(() => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'border-green-200 bg-green-50/30 hover:border-green-400',
    'OCCUPEE': 'border-red-200 bg-red-50/30 hover:border-red-400',
    'RESERVEE': 'border-orange-200 bg-orange-50/30 hover:border-orange-400',
    'HORS_SERVICE': 'border-gray-200 bg-gray-50 opacity-60'
  }
  return classes[props.table.status] || ''
})

const badgeClass = computed(() => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'badge-success',
    'OCCUPEE': 'badge-danger',
    'RESERVEE': 'badge-warning',
    'HORS_SERVICE': 'badge-neutral'
  }
  return classes[props.table.status] || 'badge-neutral'
})

const statusLabel = computed(() => {
  const labels: Record<TableStatus, string> = {
    'LIBRE': 'Libre',
    'OCCUPEE': 'Occupée',
    'RESERVEE': 'Réservée',
    'HORS_SERVICE': 'Hors service'
  }
  return labels[props.table.status] || props.table.status
})
</script>

