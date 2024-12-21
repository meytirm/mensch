<script setup lang="ts">
import MenschStep from '@/components/mensch-game/MenschStep.vue'

defineProps<{
  color: string
  coordinates: [number, number][]
}>()
</script>

<template>
  <MenschStep
    v-for="(coordinate, index) in coordinates"
    :key="index"
    :color="color"
    :column="coordinate[0]"
    :row="coordinate[1]"
  />
</template>

<style scoped lang="scss"></style>
