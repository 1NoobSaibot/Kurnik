<template>
	<q-card>
		<q-card-section
			v-if="gameState === 0"
			style="width: 300px"
		>
			<q-select
				:model-value="whitePlayer"
				label="White"
				:options="['me', 'bot']"
				@update:model-value="setPlayer($event, 0)"
			/>
			<q-select
				:model-value="blackPlayer"
				label="Black"
				:options="['me', 'bot']"
				@update:model-value="setPlayer($event, 1)"
			/>
			<q-btn label="Start" color="primary" @click="startGame"/>
		</q-card-section>
		<q-card-section
			v-else-if="gameState === 2"
			style="width: 300px"
		>
			<q-btn label="New Game" color="primary" @click="restartGame"/>
		</q-card-section>
	</q-card>
</template>

<script lang='ts'>
import { computed, defineComponent, toRef, Ref, ref, watch } from 'vue'
import { axios } from 'src/boot/axios'
import { Socket } from 'socket.io-client'

interface Player {
	isBot: boolean,
	complexity?: number,
	wsIds?: string[]
}

type Config = (Player|undefined)[]

export default defineComponent({
	name: 'ReversiConfig',
	props: {
		gameId: {
			type: Number,
			required: true
		},
		socket: Socket,
		gameState: {
			type: Number,
			required: true
		}
	},
	setup(props, { emit }) {
		const gameId = toRef(props, 'gameId') as Ref<number>
		const socket = toRef(props, 'socket') as Ref<Socket>
		const whitePlayer = ref<string>('')
		const blackPlayer = ref<string>('')
		const wsId = computed<string>(() => {
			return socket.value?.id ?? ''
		})

		socket.value
			.on('game-config', (players: Config) => setPlayers(players))
		
		function setPlayers (players: Config) {
			whitePlayer.value = player2Option(players[0])
			blackPlayer.value = player2Option(players[1])
		}

		function fetchConfig () {
			axios.get<Config>(`api/reversi/${gameId.value}/config`)
				.then(
					({ data }) => setPlayers(data),
					(e) => console.error(e)
				)
		}

		function player2Option (player: Player|undefined): string {
			if (!player) {
				return ''
			}

			if (player.isBot) {
				return 'bot'
			}

			const ids = player.wsIds || []
			for (let i = 0; i < ids.length; i++) {
				if (ids[i] === wsId.value) {
					return 'me'
				}
			}

			return 'stranger'
		}
		
		function setPlayer (who: 'me'|'bot', side: number) {
			axios.post<void>(`api/reversi/${gameId.value}/set/player`, {
				wsId: wsId.value,
				player: who,
				side
			})
				.catch((e) => { throw e })
		}

		async function startGame () {
			await axios.post<void>(`api/reversi/${gameId.value}/start`)
			emit('started')
		}

		async function restartGame () {
			await axios.post<{ gameId: number }>(`api/reversi/${gameId.value}/restart`, {
				wsId: wsId.value
			})
			// Note: The room should get new game-Id by WS
		}

		watch(gameId, fetchConfig)

		fetchConfig()

		return {
			whitePlayer,
			blackPlayer,
			restartGame,
			setPlayer,
			startGame
		}
	},
})
</script>
