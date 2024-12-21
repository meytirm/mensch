<script setup lang="ts">
import { computed } from 'vue'
import menschPlayers from '@/components/mensch-game/menschPlayers'

const props = defineProps<{
  column: number
  row: number
  user: string
  isTurn: boolean
}>()

const emit = defineEmits<{
  (e: 'click-on-piece', coordination: number[]): void
}>()

const user = menschPlayers.find((player) => player.userName === props.user)
const color = user ? user.color : 'white'

const xyInGrid = computed(() => ({
  gridColumnStart: String(props.column),
  gridRowStart: String(props.row)
}))

const stepBackground = computed(() => ({ background: color }))

function emitClick() {
  if (props.isTurn) {
    emit('click-on-piece', [props.column, props.row])
  }
}
</script>

<template>
  <div class="mensch-piece" :style="[stepBackground, xyInGrid]" @click="emitClick">
    <div v-if="isTurn" class="mensch-piece__turn">move</div>
  </div>
</template>

<style scoped lang="scss">
.mensch-piece {
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid black;
  box-shadow: 0px 0px 3px 1px #000;
  margin: 10%;
  transition: all 0.3s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &__turn {
    position: absolute;
    font-weight: bolder;
  }
}
</style>
