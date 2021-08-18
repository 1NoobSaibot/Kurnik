<template>
  <div>
    <div>White({{wCounter}}) Black({{bCounter}}) </div>
    <table>
      <tr v-for="y in 8" :key="y">
        <td v-for="x in 8" :key="x" @click="onMove(x-1, y-1)" :style="getCellStyle(x-1, y-1)">
          {{ getCellValue(x-1, y-1) }}
        </td>
      </tr>
    </table>
    {{ gameData }}
  </div>
</template>

<script lang='ts'>
import axios from 'axios'
import { ReversiCell, GameData } from '../../components/typesFromBkend/games/reversi/GameData'
import { Score } from '../../components/typesFromBkend/common'

export default {
  props: {
    roomId: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    gameData: {
      m: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      isGameOver: false,
      currentPlayer: ReversiCell.White,
      probs: undefined,
      yourScore: Score.Draw
    } as GameData,
  }),
  computed: {
    wCounter () {
      return this.countCells(this.gameData.m, ReversiCell.White)
    },
    bCounter () {
      return this.countCells(this.gameData.m, ReversiCell.Black)
    }
  },
  methods: {
    async onMove(x: number, y: number) {
      try {
        const { data } = await axios.put<GameData>(`api/room/${this.roomId}/game/move`, { x, y })
        this.gameData = data
      } catch (e) {
        console.error(e)
      }
    },
    countCells(m: ReversiCell[][], cell: ReversiCell) {
      let sum = 0
      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          if (m[i][j] == cell)
            sum += 1
        }
      }
      return sum
    },
    getCellValue(x: number, y: number) {
      if (this.gameData.m[x][y] !== ReversiCell.Empty)
        return '⬤'
      return ' '
    },
    getCellStyle (x: number, y: number) {
      return {
        color: this.gameData.m[x][y] == ReversiCell.White ? 'white' : 'black'
      }
    }
  },
  created () {
    console.log('Reversi.vue: created')
  },
  mounted () {
    console.log('Reversi.vue: mounted')
  }
}
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
