<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn label="Create" color="primary" @click="createRoom" class="button"/>
      <q-table
        title="Treats"
        :rows="rooms"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-actions="{ row: { id } }">
          <div>
            <q-btn label="Open" @click="$router.push(`/room/${id}`)"/>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RoomHeaderData } from 'src/components/typesFromBkend/common'
import { axios } from 'src/boot/axios'

const columns = [
	{ name: 'roomId', label: 'Room ID', field: 'id', align: 'left', sortable: true },
	{ name: 'game', label: 'Game', field: 'game', align: 'center', sortable: true },
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
					const { id, game } = res.data
					router
						.push(`/room/${id}`)
						.catch((err) => alert(err))
				})
				.catch(err => {
					alert(err)
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

<style scoped>
.button {
	margin-bottom: 16px;
}
</style>
