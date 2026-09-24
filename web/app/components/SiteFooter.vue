<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'
import type { IconName } from '~/components/AppIcon.vue'
import type { VillageStats } from '~/types/villageStats'

const props = withDefaults(defineProps<{
  stats?: VillageStats | null
}>(), {
  stats: null
})

const formatDate = (value?: string | null) => value
  ? new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(stegaClean(value)))
  : '—'

const newestHref = computed(() => {
  const slug = stegaClean(props.stats?.newest?.slug?.current)
  return slug ? `/smurfs/${slug}` : null
})

const items = computed<Array<{ label: string, value: string, icon: IconName, to?: string | null }>>(() => [
  { label: 'Residents', value: String(props.stats?.residents ?? 0), icon: 'users' },
  { label: 'Portraits', value: String(props.stats?.portraits ?? 0), icon: 'image' },
  { label: 'Newest arrival', value: props.stats?.newest?.name ?? '—', icon: 'sparkles', to: newestHref.value },
  { label: 'Last updated', value: formatDate(props.stats?.lastUpdated), icon: 'clock' }
])
</script>

<template>
  <footer class="border-t border-line">
    <AppContainer class="py-10 sm:py-12">
      <dl class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div
          v-for="item in items"
          :key="item.label"
          class="flex flex-col gap-1"
        >
          <dt class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            <AppIcon
              :name="item.icon"
              class="size-3.5"
            />
            {{ item.label }}
          </dt>
          <dd class="text-lg font-semibold text-highlighted">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="hover:text-primary"
            >
              {{ item.value }}
            </NuxtLink>
            <template v-else>
              {{ item.value }}
            </template>
          </dd>
        </div>
      </dl>

      <p class="mt-8 text-sm text-muted">
        Content from Sanity • © {{ new Date().getFullYear() }}
      </p>
    </AppContainer>
  </footer>
</template>
