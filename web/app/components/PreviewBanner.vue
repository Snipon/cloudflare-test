<script setup lang="ts">
const visualEditing = useSanityVisualEditingState()
const inPresentationTool = useIsSanityPresentationTool()

// Only show when previewing drafts outside the Studio's Presentation tool
// (`inPresentationTool` is null until detection has settled).
const visible = computed(() => !!visualEditing?.enabled && inPresentationTool.value === false)
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
  >
    <div class="flex items-center gap-3 rounded-full border border-default bg-default/90 py-1.5 pl-4 pr-1.5 text-sm shadow-lg backdrop-blur">
      <span class="flex items-center gap-2 text-muted">
        <span class="size-2 rounded-full bg-primary" />
        Previewing drafts
      </span>
      <UButton
        to="/preview/disable"
        external
        label="Exit preview"
        size="xs"
        color="neutral"
        variant="soft"
      />
    </div>
  </div>
</template>
