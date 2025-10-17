<template>
  <BaseModal
    :is-open="isOpen"
    :title="modalTitle"
    :subtitle="modalSubtitle"
    @close="handleClose"
  >
    <!-- Mode: Affichage (View) -->
    <div v-if="mode === 'view' && table" class="space-y-6">
      <!-- Badge de statut -->
      <div class="flex justify-center">
        <span :class="['badge-base text-sm sm:text-base px-4 py-2', getStatusBadgeClass(table.status)]">
          {{ getStatusLabel(table.status) }}
        </span>
      </div>

      <!-- Informations principales -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Numéro</p>
          <p class="text-base sm:text-lg font-semibold text-gray-900">#{{ table.number }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Capacité</p>
          <p class="text-base sm:text-lg font-semibold text-gray-900">{{ table.capacity }} pers.</p>
        </div>
        <div v-if="table.location" class="space-y-1 col-span-2 sm:col-span-1">
          <p class="text-xs text-gray-500">Localisation</p>
          <p class="text-base sm:text-lg font-semibold text-gray-900">{{ table.location }}</p>
        </div>
      </div>

      <!-- QR Code -->
      <div v-if="table.qrCode" class="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <img :src="table.qrCode" alt="QR Code" class="w-40 h-40 sm:w-48 sm:h-48 mb-4" />
        <p class="text-xs sm:text-sm text-gray-600 text-center font-medium">
          Scannez ce code pour passer commande
        </p>
      </div>

      <!-- Statut détaillé -->
      <div class="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex gap-2">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clip-rule="evenodd" />
          </svg>
          <p class="text-xs sm:text-sm text-gray-700">{{ getStatusMessage(table.status) }}</p>
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4 pt-4 sm:pt-6 border-t border-gray-200">
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Créée le</p>
          <p class="text-xs sm:text-sm font-medium">{{ formatDate(table.createdAt) }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Mise à jour</p>
          <p class="text-xs sm:text-sm font-medium">{{ formatDate(table.updatedAt) }}</p>
        </div>
      </div>
    </div>

    <!-- Mode: Création/Édition (Create/Edit) -->
    <div v-else class="space-y-4 sm:space-y-6">
      <!-- Sélecteur de statut -->
      <div class="space-y-2">
        <label class="label-base label-required">Statut</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <button
            v-for="status in statusOptions"
            :key="status"
            type="button"
            @click="formData.status = status"
            :class="[
              'btn-base text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 rounded-lg transition-all',
              formData.status === status ? getStatusClass(status) : 'btn-outline'
            ]"
          >
            {{ getStatusLabel(status) }}
          </button>
        </div>
      </div>

      <!-- Numéro -->
      <div class="space-y-2">
        <label for="number" class="label-base label-required">Numéro de table</label>
        <input
          id="number"
          v-model.number="formData.number"
          type="number"
          class="input-base"
          :class="{ 'border-red-500': errors.number }"
          placeholder="Ex: 1"
          min="1"
          required
        />
        <p v-if="errors.number" class="text-xs sm:text-sm text-red-600">{{ errors.number }}</p>
      </div>

      <!-- Capacité -->
      <div class="space-y-2">
        <label for="capacity" class="label-base label-required">Capacité (personnes)</label>
        <input
          id="capacity"
          v-model.number="formData.capacity"
          type="number"
          class="input-base"
          :class="{ 'border-red-500': errors.capacity }"
          placeholder="Ex: 4"
          min="1"
          max="20"
          required
        />
        <p v-if="errors.capacity" class="text-xs sm:text-sm text-red-600">{{ errors.capacity }}</p>
        <p class="text-xs text-gray-500">Entre 1 et 20 personnes</p>
      </div>

      <!-- Localisation -->
      <div class="space-y-2">
        <label for="location" class="label-base">Localisation</label>
        <input
          id="location"
          v-model="formData.location"
          type="text"
          class="input-base"
          placeholder="Ex: Terrasse, Intérieur, Jardin..."
        />
        <p class="text-xs text-gray-500">Optionnel - Aide à identifier la table</p>
      </div>

      <!-- Afficher QR Code si mode édition et QR existe -->
      <div v-if="mode === 'edit' && table?.qrCode" class="space-y-2">
        <label class="label-base">Code QR existant</label>
        <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <img :src="table.qrCode" alt="QR Code" class="w-24 h-24 sm:w-32 sm:h-32 mb-2" />
          <p class="text-xs text-gray-600">Code QR actuel</p>
        </div>
      </div>

      <!-- Message d'erreur global -->
      <div v-if="globalError" class="alert-error">
        <span>⚠️</span>
        <span>{{ globalError }}</span>
      </div>
    </div>

    <!-- Footer avec actions conditionnelles -->
    <template #footer="{ close }">
      <!-- Mode Affichage -->
      <template v-if="mode === 'view'">
        <button @click="close" class="btn-outline flex-1 sm:flex-none">
          Fermer
        </button>
        <button
          v-if="canEdit"
          @click="switchToEditMode"
          class="btn-primary flex-1 sm:flex-none"
        >
          Modifier
        </button>
        <button
          v-if="canChangeStatus && table && table.status === 'LIBRE'"
          @click="quickStatusChange('OCCUPEE')"
          class="btn-success flex-1 sm:flex-none hidden sm:flex"
        >
          Occuper
        </button>
        <button
          v-if="canChangeStatus && table && table.status === 'OCCUPEE'"
          @click="quickStatusChange('LIBRE')"
          class="btn-success flex-1 sm:flex-none hidden sm:flex"
        >
          Libérer
        </button>
      </template>

      <!-- Mode Création/Édition -->
      <template v-else>
        <button @click="handleCancel" class="btn-outline flex-1 sm:flex-none">
          Annuler
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="spinner-small"></span>
          <span>{{ loading ? 'Enregistrement...' : submitButtonText }}</span>
        </button>
      </template>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Table, TableStatus } from '~/types'

type ModalMode = 'view' | 'edit' | 'create'

interface Props {
  isOpen: boolean
  mode?: ModalMode
  table?: Table | null
  canEdit?: boolean
  canChangeStatus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'view',
  table: null,
  canEdit: true,
  canChangeStatus: true
})

const emit = defineEmits<{
  close: []
  save: [data: Partial<Table>]
  statusChange: [tableId: number, newStatus: TableStatus]
}>()

const loading = ref(false)
const globalError = ref('')
const errors = reactive<Record<string, string>>({})
const currentMode = ref<ModalMode>(props.mode)

const statusOptions: TableStatus[] = ['LIBRE', 'OCCUPEE', 'RESERVEE', 'HORS_SERVICE']

// Données du formulaire
const formData = reactive({
  number: props.table?.number || 1,
  capacity: props.table?.capacity || 4,
  location: props.table?.location || '',
  status: (props.table?.status || 'LIBRE') as TableStatus
})

// Computed
const modalTitle = computed(() => {
  if (currentMode.value === 'create') return 'Créer une table'
  if (currentMode.value === 'edit') return `Modifier Table ${props.table?.number || ''}`
  return `Table ${props.table?.number || ''}`
})

const modalSubtitle = computed(() => {
  if (currentMode.value === 'view' && props.table) {
    return `${getStatusLabel(props.table.status)} • ${props.table.capacity} pers.`
  }
  if (currentMode.value === 'edit') return 'Mettez à jour les informations'
  if (currentMode.value === 'create') return 'Ajoutez une nouvelle table'
  return ''
})

const submitButtonText = computed(() => {
  return currentMode.value === 'create' ? 'Créer' : 'Enregistrer'
})

// Méthodes
const getStatusLabel = (status: TableStatus): string => {
  const labels: Record<TableStatus, string> = {
    'LIBRE': 'Libre',
    'OCCUPEE': 'Occupée',
    'RESERVEE': 'Réservée',
    'HORS_SERVICE': 'H.S.'
  }
  return labels[status] || ''
}

const getStatusBadgeClass = (status: TableStatus): string => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'badge-success',
    'OCCUPEE': 'badge-danger',
    'RESERVEE': 'badge-warning',
    'HORS_SERVICE': 'badge-gray'
  }
  return classes[status] || ''
}

const getStatusClass = (status: TableStatus): string => {
  const classes: Record<TableStatus, string> = {
    'LIBRE': 'btn-success',
    'OCCUPEE': 'btn-danger',
    'RESERVEE': 'btn-warning',
    'HORS_SERVICE': 'btn-gray'
  }
  return classes[status] || ''
}

const getStatusMessage = (status: TableStatus): string => {
  const messages: Record<TableStatus, string> = {
    'LIBRE': 'Cette table est libre et prête à accueillir des clients.',
    'OCCUPEE': 'Cette table est actuellement occupée.',
    'RESERVEE': 'Cette table est réservée pour une période donnée.',
    'HORS_SERVICE': 'Cette table n\'est pas disponible pour le moment.'
  }
  return messages[status] || ''
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach(key => delete errors[key])
  globalError.value = ''

  let isValid = true

  // Validation numéro
  if (!formData.number || formData.number < 1) {
    errors.number = 'Le numéro doit être supérieur à 0'
    isValid = false
  }

  // Validation capacité
  if (!formData.capacity || formData.capacity < 1 || formData.capacity > 20) {
    errors.capacity = 'La capacité doit être entre 1 et 20'
    isValid = false
  }

  return isValid
}

const switchToEditMode = () => {
  currentMode.value = 'edit'
  if (props.table) {
    formData.number = props.table.number
    formData.capacity = props.table.capacity
    formData.location = props.table.location || ''
    formData.status = props.table.status
  }
}

const handleCancel = () => {
  if (props.mode === 'view') {
    currentMode.value = 'view'
  } else {
    handleClose()
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    globalError.value = 'Veuillez corriger les erreurs du formulaire'
    return
  }

  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    emit('save', {
      number: formData.number,
      capacity: formData.capacity,
      location: formData.location || undefined,
      status: formData.status
    })
    
    handleClose()
  } catch (error: any) {
    globalError.value = error.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}

const quickStatusChange = async (newStatus: TableStatus) => {
  if (props.table?.id) {
    emit('statusChange', parseInt(props.table.id.toString()), newStatus)
    handleClose()
  }
}

const handleClose = () => {
  currentMode.value = props.mode
  emit('close')
}

// Watchers
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    currentMode.value = props.mode
    if (props.table && (props.mode === 'edit' || props.mode === 'view')) {
      formData.number = props.table.number
      formData.capacity = props.table.capacity
      formData.location = props.table.location || ''
      formData.status = props.table.status
    }
  } else {
    // Reset errors
    Object.keys(errors).forEach(key => delete errors[key])
    globalError.value = ''
  }
})

watch(() => props.mode, (newMode) => {
  currentMode.value = newMode
})
</script>
