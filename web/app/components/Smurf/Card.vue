<script setup lang="ts">
import type { SmurfListItem } from '~/types/smurf'

defineProps<{
  smurf: SmurfListItem
}>()
</script>

<template>
  <NuxtLink
    :to="`/smurfs/${smurf.slug?.current}`"
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
