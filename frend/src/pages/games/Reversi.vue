<template>
  <div>
    <div>White({{wCounter}}) Black({{bCounter}}) </div>
    <table>
      <tr v-for="y in 8" :key="y">
        <td
          v-for="x in 8" :key="x"
          @click="$emit('move', { x: x-1, y: y-1 })"
          :style="getCellStyle(x-1, y-1)"
        >
          {{ getCellValue(x-1, y-1) }}
        </td>
      </tr>
    </table>
    {{ gameData }}
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, toRef } from 'vue'
import { ReversiCell, GameData } from '../../components/typesFromBkend/games/reversi/GameData'

export default defineComponent({
  props: {
    gameData: Object
  },
  setup (props) {
    const gameData = toRef(props, 'gameData')
    const board = computed<ReversiCell[][]>(() => {
      if (gameData.value)
        return gameData.value.m
      return [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    })

    const bCounter = computed<number>(() => {
      return countCells(board.value, ReversiCell.Black)
    })
    const wCounter = computed<number>(() => {
      return countCells(board.value, ReversiCell.White)
    })
    function countCells (m: ReversiCell[][], cell: ReversiCell) {
      let sum = 0
      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          if (m[i][j] == cell)
            sum += 1
        }
      }
      return sum
    }

    const getCellValue = (x: number, y: number) => {
      if (board.value[x][y] !== ReversiCell.Empty)
        return '⬤'
      return ' '
    }
    const getCellStyle = (x: number, y: number) => {
      return {
        color: board.value[x][y] == ReversiCell.White ? 'white' : 'black'
      }
    }

    return {
      bCounter,
      wCounter,
      getCellValue,
      getCellStyle
    }
  }
})
</script>

<style scoped>
tr {
  height: 30px;
}
.white {
  color: white
}
.black {
  color: black
}
td {
  width: 30px;
  background-color: darkgreen;
  text-align: center;
  font-size: 18px
}
</style>
