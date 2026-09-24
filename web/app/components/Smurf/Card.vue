<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'
import type { SmurfListItem } from '~/types/smurf'

const props = defineProps<{
  smurf: SmurfListItem
}>()

// Stega-encoded strings must not end up in hrefs.
const href = computed(() => `/smurfs/${stegaClean(props.smurf.slug?.current ?? '')}`)
</script>

<template>
  <NuxtLink
    :to="href"
    class="group flex flex-col gap-4 rounded-3xl border border-default bg-default p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
  >
    <SmurfPortrait
      :image="smurf.image"
      :name="smurf.name ?? ''"
      :size="480"
    />

    <div class="flex flex-col gap-1.5 px-1 pb-1">
      <h2 class="text-lg font-semibold text-highlighted group-hover:text-primary">
        {{ smurf.name }}
      </h2>
      <p class="line-clamp-3 text-sm leading-relaxed text-muted">
        {{ smurf.personality }}
      </p>
    </div>
  </NuxtLink>
</template>
