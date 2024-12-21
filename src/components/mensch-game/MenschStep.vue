<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  column: number
  row: number
  color: string
}>()

const xyInGrid = computed(() => ({
  gridColumnStart: String(props.column),
  gridRowStart: String(props.row)
}))

const stepBackground = computed(() => ({ background: props.color }))
</script>

<template>
  <div class="mensch-step" :style="[stepBackground, xyInGrid]"></div>
</template>

<style scoped lang="scss">
.mensch-step {
  border-radius: 50%;
  border: 3px solid black;
}
</style>
