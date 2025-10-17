<template>
  <Teleport to="body">
    <!-- Overlay (backdrop) -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        @click="handleBackdropClick"
      />
    </Transition>

    <!-- Modal Container -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 pointer-events-none"
      >
        <!-- Modal Box -->
        <div
          class="pointer-events-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto w-full sm:w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl animate-in slide-in-from-bottom-5 sm:zoom-in-95"
          @click.stop
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl sm:rounded-t-2xl">
            <div class="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
              <div class="flex-1">
                <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {{ title }}
                </h2>
                <p v-if="subtitle" class="text-xs sm:text-sm text-gray-600 mt-1">
                  {{ subtitle }}
                </p>
              </div>

              <!-- Close Button -->
              <button
                @click="close"
                class="ml-4 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                aria-label="Fermer"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Body (scrollable) -->
          <div class="px-4 sm:px-6 py-4 sm:py-6">
            <slot />
          </div>

          <!-- Footer (sticky) -->
          <div v-if="$slots.footer" class="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  subtitle?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
  closeOnEscape: true
})

const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

// Fermer avec Échap
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.closeOnEscape && props.isOpen) {
      close()
    }
  }

  if (process.client) {
    window.addEventListener('keydown', handleKeyDown)
  }

  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
})

// Empêcher scroll du body quand modal ouvert
watch(
  () => props.isOpen,
  (newVal) => {
    if (process.client) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
)
</script>

<style scoped>
/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (min-width: 640px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: scale(0.95) translateY(0);
    opacity: 0;
  }
}
</style>
