<script setup lang="ts">
import { VILLAGE_STATS_QUERY } from '~/queries/villageStats'
import type { VillageStats } from '~/types/villageStats'

const { data: stats } = await useSanityQuery<VillageStats>(VILLAGE_STATS_QUERY)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: title => title ? `${title} · Smurf Village` : 'Smurf Village'
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <AppContainer class="flex h-16 items-center">
        <NuxtLink
          to="/"
          class="-ms-1 flex items-center gap-2 rounded-md p-1 font-semibold text-highlighted focus-visible:outline-2 focus-visible:outline-primary"
        >
          <AppIcon
            name="sparkles"
            class="size-5 text-primary"
          />
          Smurf Village
        </NuxtLink>
      </AppContainer>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <LazySiteFooter
      hydrate-on-visible
      :stats="stats"
    />

    <!-- Depends on client-only Presentation-tool detection; avoid hydration mismatches. -->
    <ClientOnly>
      <PreviewBanner />
    </ClientOnly>
  </div>
</template>
