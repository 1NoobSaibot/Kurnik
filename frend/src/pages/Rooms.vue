<template>
	<div class="q-pa-md">
		<q-btn label="Create" color="primary" @click="createRoom"/>
		<q-table
			title="Treats"
			:rows="rooms"
			:columns="columns"
			row-key="name"
		>
			<template v-slot:body-cell-actions>
				<div>
					<q-btn label="Play" title="Play"/>
					<q-btn label="Watch"/>
				</div>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RoomHeaderData } from 'src/components/typesFromBkend/common'
import { axios } from 'src/boot/axios'

const columns = [
	{ name: 'roomId', label: 'Room ID', align: 'left', sortable: true },
	{ name: 'game', align: 'center', label: 'Game', field: 'calories', sortable: true },
	{ name: 'actions', align: 'right' }
]

export default {
	setup () {
		const router = useRouter()
		const rooms = ref<RoomHeaderData[]>([])

		axios.get<RoomHeaderData[]>('api/room')
			.then(res => {
				const { data } = res
				rooms.value = data
			})

		function createRoom () {
			axios.post<RoomHeaderData>('api/room', { game: 'Reversi' })
				.then(res => {
					router.push(`/room/${res.data.id}/${res.data.game.toLowerCase()}`)
				})
				.catch(err => {
					alert(err.message ?? err)
				})
		}

		return {
			columns,
			rooms,
			createRoom
		}
	}
}
</script>
