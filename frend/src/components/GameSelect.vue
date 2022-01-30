<template>
	<q-card>
		<q-card-section>
			<q-btn v-for="game in games" :key="game"
				:label="game"
				@click="create(game)"
			/>
		</q-card-section>
	</q-card>
</template>

<script lang='ts'>
import axios from 'axios'
import { defineComponent } from 'vue'

const GAMES = [
	'Reversi'
]

export default defineComponent({
	props: {
		roomId: {
			type: Number,
			required: true
		},
		wsId: {
			type: String,
			required: true
		}
	},
	data: () => ({
		games: GAMES
	}),
	methods: {
		async create (name: string) {
			const apiName = name.toLowerCase()
      const { data } = await axios.post<{ gameId: number }>(`api/${apiName}`, null, {
				params: {
					roomId: this.roomId,
					wsId: this.wsId
				}
      })
			this.$emit('created', { name, id: data.gameId })
		}
	}
})
</script>
