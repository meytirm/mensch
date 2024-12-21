<script setup lang="ts">
import MenschStep from '@/components/mensch-game/MenschStep.vue'
import walks from '@/components/mensch-game/walkCoordinates'
import { computed } from 'vue'
import menschPlayers from '@/components/mensch-game/menschPlayers'

const boardWalks = computed(() => {
  return walks.filter((walk) => {
    const isStarter = menschPlayers.some((menschPlayer) => {
      const menschStarter = menschPlayer.menschStarter.coordinate
      const menschHome = menschPlayer.menschHome
      if (
        (menschStarter[0] === walk[0] && menschStarter[1] === walk[1]) ||
        menschHome.some((coordinate) => coordinate[0] === walk[0] && coordinate[1] === walk[1])
      ) {
        return true
      }
    })

    return !isStarter
  })
})
</script>

<template>
  <MenschStep
    v-for="(coordinate, index) in boardWalks"
    :key="index"
    color="white"
    :column="coordinate[0]"
    :row="coordinate[1]"
  />
</template>

<style scoped lang="scss"></style>
