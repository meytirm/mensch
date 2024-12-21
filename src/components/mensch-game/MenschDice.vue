<script setup lang="ts">
import { computed } from 'vue'
import { useMenschStore } from '@/stores/mensch'

const store = useMenschStore()

const xyInGrid = computed(() => ({
  gridColumnStart: String(6),
  gridRowStart: String(6)
}))
</script>

<template>
  <div class="dice" :style="xyInGrid" @click="store.diceRandom()">
    <div class="dice__number">{{ store.dice }}</div>
  </div>
</template>

<style scoped lang="scss">
.dice {
  position: relative;

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: black;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: white;
  }
}
</style>
