<template>
	<q-card>
		<q-card-section style="width: 300px">
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
	</q-card>
</template>

<script lang='ts'>
import { computed, defineComponent, toRef, Ref, ref } from 'vue'
import { axios } from 'src/boot/axios'
import { Socket } from 'socket.io-client'

const options = [
	'Me',
	'Bot'
]

interface Player {
	isBot: boolean,
	complexity?: number,
	wsIds?: string[]
}

export default defineComponent({
	name: 'ReversiConfig',
	props: {
		gameId: {
			type: Number,
			required: true
		},
		socket: Socket
	},
	setup(props) {
		const gameId = toRef(props, 'gameId') as Ref<number>
		const socket = toRef(props, 'socket') as Ref<Socket>
		const whitePlayer = ref<string>('')
		const blackPlayer = ref<string>('')
		const wsId = computed<string>(() => {
			return socket.value?.id ?? ''
		})

		socket.value
			.on('config-changed', (players: (Player|undefined)[]) => {
				whitePlayer.value = player2Option(players[0])
				blackPlayer.value = player2Option(players[1])
			})
		
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
		}

		function startGame () {
			axios.post<void>(`api/reversi/${gameId.value}/start`)
		}

		return {
			whitePlayer,
			blackPlayer,
			setPlayer,
			startGame
		}
	},
})
</script>
