<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="section-base bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white">
      <div class="container-base text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 fade-in">
          Acoustic Club
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-indigo-100 max-w-2xl mx-auto slide-in-up">
          Gestion moderne de tables et commandes pour restaurants et boîtes
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/register" class="btn-base bg-white text-indigo-600 hover:bg-indigo-50 btn-lg">
            Commencer gratuitement
          </NuxtLink>
          <NuxtLink to="/login" class="btn-base bg-transparent border-2 border-white text-white hover:bg-white/10 btn-lg">
            Se connecter
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-base">
      <div class="container-base">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Fonctionnalités
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">🪑</div>
            <h3 class="text-xl font-bold mb-2">Gestion des tables</h3>
            <p class="text-gray-600">
              Visualisez et gérez l'état de vos tables en temps réel
            </p>
          </div>

          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">📱</div>
            <h3 class="text-xl font-bold mb-2">QR Code</h3>
            <p class="text-gray-600">
              Tickets et tables avec QR codes pour une gestion simplifiée
            </p>
          </div>

          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">📊</div>
            <h3 class="text-xl font-bold mb-2">Statistiques</h3>
            <p class="text-gray-600">
              Suivez vos performances avec des statistiques détaillées
            </p>
          </div>

          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">🍽️</div>
            <h3 class="text-xl font-bold mb-2">Menu digital</h3>
            <p class="text-gray-600">
              Gérez votre menu facilement avec des mises à jour instantanées
            </p>
          </div>

          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">💎</div>
            <h3 class="text-xl font-bold mb-2">Clients Premium</h3>
            <p class="text-gray-600">
              Programme de fidélité pour vos meilleurs clients
            </p>
          </div>

          <div class="card-base p-6 text-center">
            <div class="text-5xl mb-4">📲</div>
            <h3 class="text-xl font-bold mb-2">PWA</h3>
            <p class="text-gray-600">
              Application installable et utilisable hors ligne
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-base bg-gray-100">
      <div class="container-base text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Prêt à démarrer ?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez Acoustic Club et modernisez la gestion de votre établissement
        </p>
        <NuxtLink to="/register" class="btn-primary btn-lg">
          Créer un compte
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

