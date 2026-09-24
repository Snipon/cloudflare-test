<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'
import { SMURF_QUERY } from '~/queries/smurfs'
import type { Smurf } from '~/types/smurf'

const route = useRoute()
const slug = route.params.slug as string

const { data: smurf } = await useSanityQuery<Smurf | null>(SMURF_QUERY, { slug })

if (!smurf.value) {
  throw createError({ statusCode: 404, statusMessage: 'Smurf not found', fatal: true })
}

// Never let stega characters into <head>.
useSeoMeta({
  title: () => stegaClean(smurf.value?.name) ?? 'Smurf',
  description: () => stegaClean(smurf.value?.personality) ?? ''
})
</script>

<template>
  <UContainer
    v-if="smurf"
    class="py-12 sm:py-16"
  >
    <UButton
      to="/"
      icon="i-lucide-arrow-left"
      label="All smurfs"
      color="neutral"
      variant="ghost"
      class="mb-8"
    />

    <article class="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
      <SmurfPortrait
        :image="smurf.image"
        :name="smurf.name ?? ''"
        :size="840"
        sizes="(min-width: 768px) 420px, calc(100vw - 2rem)"
        priority
      />

      <div>
        <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          {{ smurf.name }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-muted">
          {{ smurf.personality }}
        </p>
      </div>
    </article>
  </UContainer>
</template>
