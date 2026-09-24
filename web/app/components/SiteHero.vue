<script setup lang="ts">
import type { HeroImage } from '~/types/siteSettings'

const props = withDefaults(defineProps<{
  title: string
  tagline?: string | null
  image?: HeroImage | null
  count?: number
}>(), {
  tagline: null,
  image: null,
  count: 0
})

const urlFor = useSanityImageUrl()

const src = computed(() => props.image?.asset
  ? urlFor(props.image).width(1800).height(1000).fit('crop').url()
  : null
)

const alt = computed(() => props.image?.alt || props.title)
</script>

<template>
  <section
    class="relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-3xl bg-elevated sm:min-h-[34rem]"
    :style="image?.lqip ? { backgroundImage: `url(${image.lqip})`, backgroundSize: 'cover' } : undefined"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      width="1800"
      height="1000"
      fetchpriority="high"
      decoding="async"
      class="absolute inset-0 -z-10 size-full object-cover"
    >
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      aria-hidden="true"
    />

    <div class="flex max-w-2xl flex-col items-start gap-4 p-6 text-white sm:p-10 lg:p-14">
      <span
        v-if="count"
        class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur"
      >
        {{ count }} {{ count === 1 ? 'resident' : 'residents' }}
      </span>
      <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
        {{ title }}
      </h1>
      <p
        v-if="tagline"
        class="text-lg leading-relaxed text-white/80"
      >
        {{ tagline }}
      </p>
    </div>
  </section>
</template>
