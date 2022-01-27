<template>
	<div>
		<div>
			<div>White({{wCounter}}) Black({{bCounter}}) </div>
			<board
				:board="board"
				@move="onMove"
			/>
		</div>
		<config
			:game-id="id"
			:socket="socket"
			:game-state="state"
		/>
	</div>
</template>

<script lang='ts'>
import Board from 'src/components/games/reversi/ReversiBoard.vue'
import { computed, defineComponent, toRef, Ref, ref } from 'vue'
import { ReversiCell, GameData } from 'components/games/reversi/GameData'
import { Socket } from 'socket.io-client'
import Config from './ReversiConfig.vue'
import { ReversiMove } from './ReversiMove'
import { axios } from 'src/boot/axios'

type GameState = 'created'|'started'|'ended'

export default defineComponent({
	name: 'ReversiGame',
	components: {
		Board,
		Config
	},
	props: {
		id: Number,
		socket: Socket
	},
	setup (props) {
		const socket = toRef(props, 'socket') as Ref<Socket>
		const id = toRef(props, 'id') as Ref<number>
		const state = ref<GameState>('created')
		socket.value
      .on('game-moved', fetch)
			.on('game-started', () => {
				state.value = 'started'
			})
			.on('game-over', () => {
				state.value = 'ended'
			})

		const gameData = ref<GameData|null>(null)
		const board = computed<ReversiCell[][]>(() => {
			if (gameData.value) {
				return gameData.value.m
			}
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

		async function fetch() {
			const { data } = await axios.get<GameData>(`api/reversi/${id.value}`, {
				params: {
					wsId: socket.value.id
				}
			})
			gameData.value = data
		}

		async function onMove (args: ReversiMove) {
      try {
        const { data } = await axios
          .put<GameData>(`api/reversi/${id.value}/move`, {
            ...args,
            wsId: socket.value.id
          })
        gameData.value = data
      } catch (e) {
        console.error(e)
      }
    }

		fetch()

		return {
			board,
			bCounter,
			wCounter,
			state,
			onMove
		}
	}
})
</script>
