<script setup lang="ts">
import MenschStep from '@/components/mensch-game/MenschStep.vue'
import menschPlayers from './menschPlayers'
</script>

<template>
  <MenschStep
    v-for="player in menschPlayers"
    :key="player.userName"
    :color="player.menschStarter.color"
    :column="player.menschStarter.coordinate[0]"
    :row="player.menschStarter.coordinate[1]"
  />
</template>

<style scoped lang="scss"></style>
