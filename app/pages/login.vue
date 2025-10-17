<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
    <div class="w-full max-w-md">
      <!-- Logo Card -->
      <div class="card-base p-6 sm:p-8 mb-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-transform">
            <span class="text-white font-bold text-2xl">AC</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold mb-2">Connexion</h1>
          <p class="text-sm sm:text-base text-gray-600">Accédez à votre espace Acoustic Club</p>
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

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-5">
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
              autocomplete="current-password"
              placeholder="••••••••"
              class="input-base h-12 text-base"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary h-12 mt-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="spinner mr-2"></span>
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </form>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Pas encore de compte ?
          <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
            Créer un compte
          </NuxtLink>
        </p>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center text-xs text-gray-500">
        <p>Connexion sécurisée 🔒</p>
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
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  const result = await auth.login(form)

  if (result.success) {
    // Rediriger selon le rôle
    if (auth.isAdmin.value) {
      router.push('/admin')
    } else if (auth.isServeur.value) {
      router.push('/serveur')
    } else {
      router.push('/dashboard')
    }
  } else {
    error.value = result.error || 'Erreur lors de la connexion'
  }

  loading.value = false
}
</script>

