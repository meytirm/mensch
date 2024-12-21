<script setup lang="ts">
import MenschSavePlace from '@/components/mensch-game/MenschSavePlace.vue'
import menschPlayers from './menschPlayers'
</script>

<template>
  <MenschSavePlace
    v-for="menschPlayer in menschPlayers"
    :key="menschPlayer.color"
    :color="menschPlayer.color"
    :coordinates="menschPlayer.menschSaveCoordinates"
  />
</template>

<style scoped lang="scss"></style>
