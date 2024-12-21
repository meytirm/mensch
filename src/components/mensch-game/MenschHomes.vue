<script setup lang="ts">
import MenschHome from '@/components/mensch-game/MenschHome.vue'
import menschPlayers from './menschPlayers'
</script>

<template>
  <MenschHome
    v-for="menschPlayer in menschPlayers"
    :key="menschPlayer.color"
    :color="menschPlayer.color"
    :coordinates="menschPlayer.menschHome"
  />
</template>

<style scoped lang="scss"></style>
