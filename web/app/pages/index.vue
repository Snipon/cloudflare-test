<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'
import { SMURFS_QUERY } from '~/queries/smurfs'
import { SITE_SETTINGS_QUERY } from '~/queries/siteSettings'
import type { SmurfListItem } from '~/types/smurf'
import type { SiteSettings } from '~/types/siteSettings'

const [{ data: settings }, { data: smurfs }] = await Promise.all([
  useSanityQuery<SiteSettings | null>(SITE_SETTINGS_QUERY),
  useSanityQuery<SmurfListItem[]>(SMURFS_QUERY)
])

const title = computed(() => settings.value?.title || 'Smurf Village')
const count = computed(() => smurfs.value?.length ?? 0)

useSeoMeta({
  title: () => stegaClean(title.value),
  description: () => stegaClean(settings.value?.tagline) ?? 'Meet every smurf in the village.'
})
</script>

<template>
  <AppContainer class="py-6 sm:py-8">
    <SiteHero
      :title="title"
      :tagline="settings?.tagline"
      :image="settings?.heroImage"
      :count="count"
    />

    <section class="mt-10 sm:mt-14">
      <h2 class="mb-6 text-2xl font-semibold tracking-tight text-highlighted">
        Residents
      </h2>
      <LazySmurfGrid
        hydrate-on-visible
        :smurfs="smurfs ?? []"
      />
    </section>
  </AppContainer>
</template>
