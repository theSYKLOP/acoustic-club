<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// Configuration SEO par défaut
useHead({
  title: 'Acoustic Club - Gestion de restaurant',
  meta: [
    { name: 'description', content: 'Application de gestion de tables et commandes pour restaurants et boîtes' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
