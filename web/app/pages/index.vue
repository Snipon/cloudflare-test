<script setup lang="ts">
import { SMURFS_QUERY } from '~/queries/smurfs'
import type { SmurfListItem } from '~/types/smurf'

const { data: smurfs } = await useSanityQuery<SmurfListItem[]>(SMURFS_QUERY)

const count = computed(() => smurfs.value?.length ?? 0)

useSeoMeta({
  title: 'Smurf Village',
  description: 'Meet every smurf in the village.'
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <header class="mb-10 max-w-2xl">
      <p class="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
        {{ count }} {{ count === 1 ? 'resident' : 'residents' }}
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
        Smurf Village
      </h1>
      <p class="mt-3 text-lg text-muted">
        Every smurf in the village, from Papa to the Smurflings. Pick one to read more.
      </p>
    </header>

    <SmurfGrid :smurfs="smurfs ?? []" />
  </UContainer>
</template>
