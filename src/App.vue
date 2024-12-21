<script setup lang="ts">
import { Game } from '@/app/MenschGame'
import { ref } from 'vue'

// const mensch = ref(new MenschGame(['ali', 'hasan']))
// const players = mensch.value.players
const players = [
  { id: 0, name: 'ali', color: 'blue', piecesNumber: 4, startPosition: 0 },
  { id: 1, name: 'hasan', color: 'red', piecesNumber: 4, startPosition: 11 }
]

const game = ref(new Game(players))

function play() {
  game.value.playTurn()
}
</script>

<template>
  <div>
    <div>{{ game.diceRoll }}</div>
    <div @click="play()">play</div>
    <div class="d-flex">
      <div v-for="(cell, index) in game.board.spaces" :key="index">
        <div
          v-if="cell"
          @click="game.movePiece(cell)"
          :style="cell.allowToMove ? 'background: red' : ''"
        >
          {{ `${game.players.find((player) => player.id === cell.playerId)!.name}(${cell.index})` }}
        </div>
        <div v-else>0</div>
      </div>
    </div>
    <div v-for="player in game.players" :key="player.id">
      <div v-for="piece in player.pieces" :key="piece.index" @click="game.movePiece(piece)">
        <div v-if="piece.position < 0" :style="piece.allowToMove ? 'background: red' : ''">
          {{ `${player.name}(${piece.index})` }}
        </div>
      </div>
      <div v-for="(homeCell, index) in player.homeCells" :key="index">
        <div
          v-if="homeCell"
          :style="homeCell.allowToMove ? 'background: red' : ''"
          @click="game.movePiece(homeCell)"
        >
          {{ homeCell }}
        </div>
        <div v-else>0</div>
      </div>
    </div>
    <!--    <div>{{ mensch.getCurrentPlayer.name }}</div>-->
    <!--    <div>-->
    <!--      {{ mensch.dice }}-->
    <!--    </div>-->
    <!--    {{ mensch.isWaitingForMove }}-->
    <!--    <button @click="mensch.rollDice" :disabled="mensch.isWaitingForMove">roll dice</button>-->
    <!--    <div style="display: flex; gap: 5px">-->
    <!--      <div-->
    <!--        v-for="(cell, index) in mensch.board.cells"-->
    <!--        :key="index"-->
    <!--        style="border: 1px solid black; padding: 5px"-->
    <!--      >-->
    <!--        <div-->
    <!--          :style="`background: ${players.find((player) => player.startPosition === index)?.color}`"-->
    <!--        >-->
    <!--          <div v-if="cell" :style="{ background: cell.color }" @click="mensch.playTurn(cell)">-->
    <!--            {{ cell.index }}-->
    <!--          </div>-->
    <!--          <div v-else>null</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <div v-for="player in mensch.players" :key="player.color">-->
    <!--        <div-->
    <!--          v-for="pawn in player.pawns"-->
    <!--          :key="pawn.color"-->
    <!--          :style="{ color: pawn.color }"-->
    <!--          @click="mensch.playTurn(pawn)"-->
    <!--        >-->
    <!--          {{ mensch.getCurrentPlayer.color === pawn.color ? '' : 'disabled' }}-->
    <!--          {{ player.name }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div v-for="player in mensch.players" :key="player.color">-->
    <!--        <div-->
    <!--          v-for="(home, index) in player.homeCells"-->
    <!--          :key="index"-->
    <!--          :style="{ color: player.color }"-->
    <!--          @click="mensch.playTurn(home)"-->
    <!--        >-->
    <!--          <span>-->
    <!--            {{ player.name }}-->
    <!--          </span>-->
    <!--          <span>**</span>-->
    <!--          <span>-->
    <!--            {{ home ? home : 'null' }}-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <RouterView />
  </div>
</template>

<style>
.d-flex {
  display: flex;
  gap: 5px;
}
</style>
