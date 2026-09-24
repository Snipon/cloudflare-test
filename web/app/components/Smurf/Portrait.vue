<script setup lang="ts">
import type { SmurfImage } from '~/types/smurf'

const props = withDefaults(defineProps<{
  image?: SmurfImage | null
  name: string
  size?: number
}>(), {
  image: null,
  size: 480
})

const urlFor = useSanityImageUrl()

const src = computed(() => props.image?.asset
  ? urlFor(props.image).width(props.size).height(props.size).fit('crop').url()
  : null
)

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
      :alt="alt"
      :width="size"
      :height="size"
      loading="lazy"
      decoding="async"
      class="size-full object-cover"
    >
    <div
      v-else
      class="flex size-full items-center justify-center text-muted"
      aria-hidden="true"
    >
      <UIcon
        name="i-lucide-image-off"
        class="size-10"
      />
    </div>
  </div>
</template>
