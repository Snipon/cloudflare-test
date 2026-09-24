<script setup lang="ts">
import type { SmurfListItem } from '~/types/smurf'

defineProps<{
  smurfs: SmurfListItem[]
}>()
</script>

<template>
  <ul
    v-if="smurfs.length"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <li
      v-for="smurf in smurfs"
      :key="smurf._id"
    >
      <SmurfCard :smurf="smurf" />
    </li>
  </ul>

  <div
    v-else
    class="rounded-3xl border border-dashed border-line p-12 text-center text-muted"
  >
    No smurfs yet. Add some in the Studio.
  </div>
</template>
