<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title>
					Quasar App
				</q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
			class="bg-grey-1"
		>
			<q-list>
				<q-item-label
					header
					class="text-grey-8"
				>
					Games
				</q-item-label>

				<EssentialLink
					v-for="game in games"
					:key="game.id"
					:link="`/game/${game.name.toLowerCase()}`"
					:title="game.name"
					icon="sports_esports"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import EssentialLink from '../components/EssentialLink.vue'
import { defineComponent, ref } from 'vue'

interface GameOption {
  id: number,
  name: string
}


export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink
	},

	setup () {
		const leftDrawerOpen = ref(false)
		const games = ref<GameOption[]>([])

		function loadListOfGames() {
			axios.get<GameOption[]>('/api/games')
				.then((res: AxiosResponse<GameOption[]>) => {
					games.value = res.data
				})
				.catch((error) => {
					console.error(error)
				})
		}

		loadListOfGames()

		return {
			games,
			leftDrawerOpen,
			toggleLeftDrawer () {
				leftDrawerOpen.value = !leftDrawerOpen.value
			}
		}
	}
})
</script>
