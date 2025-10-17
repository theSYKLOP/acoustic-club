<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    :subtitle="subtitle"
    :close-on-backdrop="!isDestructive"
    :close-on-escape="!isDestructive"
    @close="emit('close')"
  >
    <!-- Icône d'avertissement si destructive -->
    <div class="flex flex-col items-center">
      <div
        :class="[
          'w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6',
          isDestructive ? 'bg-red-100' : 'bg-blue-100'
        ]"
      >
        <svg
          v-if="isDestructive"
          class="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <svg
          v-else
          class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Message -->
      <p class="text-center text-sm sm:text-base text-gray-700 leading-relaxed">
        {{ message }}
      </p>

      <!-- Détails additionnels si fournis -->
      <p v-if="details" class="text-center text-xs sm:text-sm text-gray-500 mt-2">
        {{ details }}
      </p>
    </div>

    <!-- Footer -->
    <template #footer="{ close }">
      <button
        @click="close"
        class="btn-outline flex-1 sm:flex-none"
      >
        Annuler
      </button>
      <button
        @click="handleConfirm(close)"
        :disabled="loading"
        :class="[
          'flex-1 sm:flex-none flex items-center justify-center gap-2',
          isDestructive ? 'btn-danger' : 'btn-primary'
        ]"
      >
        <span v-if="loading" class="spinner-small"></span>
        <span>{{ loading ? 'Traitement...' : confirmText }}</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  subtitle?: string
  message: string
  details?: string
  confirmText?: string
  isDestructive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmer',
  isDestructive: false
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const loading = ref(false)

const handleConfirm = async (close: () => void) => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    emit('confirm')
    close()
  } finally {
    loading.value = false
  }
}
</script>
