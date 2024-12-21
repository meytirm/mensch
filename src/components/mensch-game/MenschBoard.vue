<script setup lang="ts">
import MenschSavePlaces from '@/components/mensch-game/MenschSavePlaces.vue'
import MenschStarters from '@/components/mensch-game/MenschStarters.vue'
import MenschHomes from '@/components/mensch-game/MenschHomes.vue'
import MenschWalks from '@/components/mensch-game/MenschWalks.vue'
import MenschPiece from '@/components/mensch-game/MenschPiece.vue'
import walkCoordinates from '@/components/mensch-game/walkCoordinates'
import { useMenschStore } from '@/stores/mensch'
import menschPlayers from '@/components/mensch-game/menschPlayers'
import MenschDice from '@/components/mensch-game/MenschDice.vue'

const store = useMenschStore()

function movePiece(coordination: [number, number], userName) {
  console.log(coordination, userName)
  // const coordinateIndex = walkCoordinates.findIndex(
  //   (item) => item[0] === coordination[0] && item[1] === coordination[1]
  // )

  // const newCoordinate = walkCoordinates[coordinateIndex + store.dice]

  store.movePiece(coordination, userName)

  // if (newCoordinate) {
  //   store.movePiece(newCoordinate, user, index)
  // } else {
  //   const menschPlayer = menschPlayers.find((player) => player.userName === user)!
  //   const inHome = menschPlayer.menschSaveCoordinates.some(
  //     (saveCoordinate) =>
  //       saveCoordinate[0] === coordination[0] && saveCoordinate[1] === coordination[1]
  //   )
  //   if (inHome) {
  //     const startCoordinate = menschPlayer.menschStarter.coordinate
  //     store.movePiece(startCoordinate, user, index)
  //   }
  // }
}
</script>

<template>
  <div class="mensch-board">
    <MenschDice />
    <MenschSavePlaces />
    <MenschStarters />
    <MenschHomes />
    <MenschWalks />
    <template v-for="(user, userIndex) of store.users" :key="userIndex">
      <MenschPiece
        v-for="(piece, index) of user.pieces"
        :key="index"
        :user="user.name"
        :column="piece[0]"
        :row="piece[1]"
        :is-turn="!!(store.turn === userIndex && store.piecesStatus[index])"
        @click-on-piece="movePiece($event, user.name)"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.mensch-board {
  display: grid;
  grid-template-columns: repeat(11, auto);
  grid-template-rows: repeat(11, 1fr);
  gap: 5px;
  border: 5px solid black;
  padding: 5px;
  width: 100%;
  height: 100%;
  background: burlywood;
}
</style>
