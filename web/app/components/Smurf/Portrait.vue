<script setup lang="ts">
import type { SmurfImage } from '~/types/smurf'

const props = withDefaults(defineProps<{
  image?: SmurfImage | null
  name: string
  /** Largest rendered CSS width, used to pick candidate widths. */
  size?: number
  /** `sizes` attribute describing the rendered width per breakpoint. */
  sizes?: string
  /** Eager-load with high priority (use for the page's LCP image). */
  priority?: boolean
}>(), {
  image: null,
  size: 480,
  sizes: '(min-width: 1280px) 272px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 4rem)',
  priority: false
})

const urlFor = useSanityImageUrl()

// Cards render at ~250-350 CSS px; cap candidates so high-DPR phones don't pull 2x assets.
const widths = computed(() => [240, 320, 400, 480, 640, 800].filter(w => w <= Math.max(props.size, 480)))

const url = (width: number) => urlFor(props.image!).width(width).height(width).fit('crop').url()

const src = computed(() => props.image?.asset ? url(props.size) : null)
const srcset = computed(() => props.image?.asset ? buildSrcset(widths.value, url) : undefined)

const alt = computed(() => props.image?.alt || props.name)
</script>

<template>
  <div
    class="relative aspect-square overflow-hidden rounded-2xl bg-elevated"
    :style="image?.lqip ? { backgroundImage: `url(${image.lqip})`, backgroundSize: 'cover' } : undefined"
  >
    <img
      v-if="src"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :width="size"
      :height="size"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      class="size-full object-cover"
    >
    <div
      v-else
      class="flex size-full items-center justify-center text-muted"
      aria-hidden="true"
    >
      <AppIcon
        name="image-off"
        class="size-10"
      />
    </div>
  </div>
</template>
