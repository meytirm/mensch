<script setup lang="ts">
import { ref } from 'vue'
import { MenschGame } from '@/app/MenschGame'

const mensch = ref(
  new MenschGame([
    { name: 'ali', color: 'red' },
    { name: 'hasan', color: 'blue' }
  ])
)

console.log(mensch.value.board)
</script>

<template>
  <div>
    {{ mensch.currentPlayerIndex }}
    <div>
      currentPlayer: {{ mensch.players[mensch.currentPlayerIndex].name }} ({{
        mensch.players[mensch.currentPlayerIndex].color
      }})
    </div>
    <div>
      <button @click="mensch.handleCurrentTurn()">roll dice: {{ mensch.rolledDice }}</button>
    </div>
    <div>
      <div v-for="startArea of mensch.board.startAreas" :key="startArea.color">
        <div>{{ startArea.color }}</div>
        <div class="d-flex">
          <div v-for="(cell, index) of startArea.cells" :key="index">
            <div
              v-if="cell"
              @click="mensch.playTurn(cell)"
              :style="`background: ${cell.color}; opacity: ${cell.canItMove ? '1' : '0.5'}`"
            >
              {{ cell.color }}( {{ cell.canItMove }})
            </div>
            <div v-else>start</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="d-flex">
      <div
        v-for="(cell, index) of mensch.board.cells"
        :key="index"
        :style="`background: ${mensch.board.startAreas[index / 10]?.color}; border: 3px solid ${
          mensch.board.startAreas[index / 10] && 'grey' + ''
        }`"
      >
        <div
          v-if="cell"
          @click="mensch.playTurn(cell)"
          :style="`background: ${cell.color}; opacity: ${cell.canItMove ? '1' : '0.5'}`"
        >
          ({{ cell.canItMove }})
        </div>
        <div v-else>0</div>
      </div>
    </div>
    <div>
      <div v-for="endArea of mensch.board.endAreas" :key="endArea.color">
        <div>{{ endArea.color }}</div>
        <div class="d-flex">
          <div v-for="(cell, index) of endArea.cells" :key="index">
            <div
              v-if="cell"
              @click="mensch.playTurn(cell)"
              :style="`background: ${cell.color}; opacity: ${cell.canItMove ? '1' : '0.5'}`"
            >
              {{ cell.color }}( {{ cell.canItMove }})
            </div>
            <div v-else>start</div>
          </div>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style>
.d-flex {
  display: flex;
  gap: 5px;
}
</style>
