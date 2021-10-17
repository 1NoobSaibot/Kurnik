<template>
	<div>
		<div>White({{wCounter}}) Black({{bCounter}}) </div>
		<board
			:board="board"
			@move="$emit('move', $event)"
		/>
		{{ gameData }}
	</div>
</template>

<script lang='ts'>
import Board from '../../components/games/reversi/Board.vue'
import { computed, defineComponent, toRef, Ref } from 'vue'
import { ReversiCell, GameData } from '../../components/typesFromBkend/games/reversi/GameData'

export default defineComponent({
	components: {
		Board
	},
	props: {
		gameData: Object
	},
	setup (props) {
		const gameData = toRef(props, 'gameData') as Ref<GameData>
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

		return {
			board,
			bCounter,
			wCounter
		}
	}
})
</script>
