<template>
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
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ReversiCell } from './GameData'

export default defineComponent({
	name: 'ReversiBoard',
	props: {
		board: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		animatorId: undefined as number|undefined,
		currentBoard: [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		] as ReversiCell[][],
		interpolation: 0
	}),
	computed: {
		white2Black () {
			const v = Math.round(255 * (1 - this.interpolation))
			return `rgb(${v}, ${v}, ${v})`
		},
		black2White () {
			const v = Math.round(255 * this.interpolation)
			return `rgb(${v}, ${v}, ${v})`
		},
		empty2White () {
			const v = Math.round(255 * this.interpolation)
			return `rgba(255, 255, 255, ${v})`
		},
		empty2Black () {
			const v = Math.round(255 * (1 - this.interpolation))
			return `rgba(0, 0, 0, ${v})`
		},
		white2Empty () {
			const v = Math.round(255 * (1 - this.interpolation))
			return `rgba(255, 255, 255, ${v})`
		},
		black2Empty() {
			const v = Math.round(255 * this.interpolation)
			return `rgba(0, 0, 0, ${v})`
		},
	},
	methods: {
		getCellValue (x: number, y: number): string {
			const board: ReversiCell[][] = this.board as ReversiCell[][]
			if (board[x][y] !== ReversiCell.Empty)
				return '⬤'
			return ' '
		},
		getCellStyle (x: number, y: number): Record<string, string> {
			const board: ReversiCell[][] = this.board as ReversiCell[][]
			return {
				color: board[x][y] == ReversiCell.White ? 'white' : 'black'
			}
		},
		startAnimation () {
			this.interpolation = 0
			this.animatorId = +setInterval(() => {
				if (this.interpolation == 1)
					return
				this.interpolation += 0.03
				if (this.interpolation > 1) {
					this.interpolation = 1
					clearInterval(this.animatorId)
				}
			}, 30)
		}
	},
	mounted () {
		this.startAnimation()
	},
	beforeUnmount () {
		clearInterval(this.animatorId)
	},
	watch: {
		board (newBoard, oldBoard: ReversiCell[][]) {
			clearInterval(this.animatorId)
			this.currentBoard = oldBoard
			this.startAnimation()
		}
	}
})
</script>

<style scoped>
tr {
	height: 30px;
}
td {
	width: 30px;
	background-color: darkgreen;
	text-align: center;
	font-size: 18px
}
.white {
	color: white
}
.black {
	color: black
}
</style>
