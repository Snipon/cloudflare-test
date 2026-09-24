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

// Two hotspot-aware crops: portrait-ish on phones, wide on larger screens.
const MOBILE = { media: '(max-width: 639px)', ratio: 4 / 5, widths: [360, 480, 600], sizes: 'calc(100vw - 2rem)' }
const WIDE = { ratio: 2.2, widths: [800, 1000, 1200, 1600, 2000], sizes: '(min-width: 1280px) 1216px, calc(100vw - 2rem)' }

const crop = (ratio: number) => (width: number) =>
  urlFor(props.image!).width(width).height(Math.round(width / ratio)).fit('crop').url()

const hasImage = computed(() => !!props.image?.asset)
const wideSrc = computed(() => hasImage.value ? crop(WIDE.ratio)(1200) : null)
const wideSrcset = computed(() => hasImage.value ? buildSrcset(WIDE.widths, crop(WIDE.ratio)) : undefined)
const mobileSrcset = computed(() => hasImage.value ? buildSrcset(MOBILE.widths, crop(MOBILE.ratio)) : undefined)

const alt = computed(() => props.image?.alt || props.title)

// The hero is the LCP element: let the browser fetch the right candidate before CSS/JS settle.
useHead(() => ({
  link: hasImage.value
    ? [
        { rel: 'preload', as: 'image', imagesrcset: mobileSrcset.value, imagesizes: MOBILE.sizes, media: MOBILE.media, fetchpriority: 'high' },
        { rel: 'preload', as: 'image', imagesrcset: wideSrcset.value, imagesizes: WIDE.sizes, media: '(min-width: 640px)', fetchpriority: 'high' }
      ]
    : []
}))
</script>

<template>
  <section
    class="relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-3xl bg-elevated sm:min-h-[34rem]"
    :style="image?.lqip ? { backgroundImage: `url(${image.lqip})`, backgroundSize: 'cover' } : undefined"
  >
    <picture v-if="wideSrc">
      <source
        :media="MOBILE.media"
        :srcset="mobileSrcset"
        :sizes="MOBILE.sizes"
      >
      <img
        :src="wideSrc"
        :srcset="wideSrcset"
        :sizes="WIDE.sizes"
        :alt="alt"
        width="1200"
        height="545"
        fetchpriority="high"
        decoding="async"
        class="absolute inset-0 -z-10 size-full object-cover"
      >
    </picture>
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
