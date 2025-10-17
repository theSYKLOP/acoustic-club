<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
    <div class="w-full max-w-md">
      <!-- Logo Card -->
      <div class="card-base p-6 sm:p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-transform">
            <span class="text-white font-bold text-2xl">AC</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold mb-2">Inscription</h1>
          <p class="text-sm sm:text-base text-gray-600">Créez votre compte Acoustic Club</p>
        </div>

        <!-- Error Alert -->
        <transition
          enter-active-class="transition duration-200"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="error" class="alert-error mb-6">
            <span>⚠️</span>
            <span class="text-sm">{{ error }}</span>
          </div>
        </transition>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-4 sm:space-y-5">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
              <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              placeholder="Jean Dupont"
              class="input-base h-12 text-base"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="votre@email.com"
              class="input-base h-12 text-base"
            />
          </div>

          <!-- Phone Input -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Téléphone (optionnel)
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              placeholder="+33 6 12 34 56 78"
              class="input-base h-12 text-base"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
              <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="••••••••"
              class="input-base h-12 text-base"
            />
            <p class="form-help text-xs mt-1">Minimum 6 caractères</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary h-12 mt-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="spinner mr-2"></span>
            <span v-if="loading">Création en cours...</span>
            <span v-else>Créer mon compte</span>
          </button>
        </form>
      </div>

      <!-- Sign In Link -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-600">
          Déjà un compte ?
          <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
            Se connecter
          </NuxtLink>
        </p>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center text-xs text-gray-500">
        <p>Données sécurisées 🔒</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: []
})

const auth = useAuth()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

const handleRegister = async () => {
  loading.value = true
  error.value = null

  const result = await auth.register(form)

  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error || 'Erreur lors de l\'inscription'
  }

  loading.value = false
}
</script>

