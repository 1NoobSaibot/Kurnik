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

<script lang='js'>
import axios from 'axios'
import { ReversiCell, GameData } from '../../components/typesFromBkend/games/reversi/GameData.ts'
import { Score } from '../../components/typesFromBkend/common.ts'

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
    },
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
    async onMove(args) {
      try {
        const { data } = await axios.put(`api/room/${this.roomId}/game/move`, args)
        this.gameData = data
      } catch (e) {
        console.error(e)
      }
    },
    countCells(m, cell) {
      let sum = 0
      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          if (m[i][j] == cell)
            sum += 1
        }
      }
      return sum
    },
    getCellValue(x, y) {
      if (this.gameData.m[x][y] !== ReversiCell.Empty)
        return '⬤'
      return ' '
    },
    getCellStyle (x, y) {
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
