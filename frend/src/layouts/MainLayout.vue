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
					Kurnik
				</q-toolbar-title>

				<q-btn label="Log In" color="secondary" @click="logIn"/>/
				<q-btn label="Sign In" color="secondary" @click="signIn"/>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
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
		<q-dialog v-model="isAuthMode">
			<login-form v-if="authMode === 'logIn'"/>
			<sign-in-form v-else/>
		</q-dialog>
	</q-layout>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import EssentialLink from '../components/EssentialLink.vue'
import { defineComponent, ref, computed } from 'vue'
import LoginForm from 'src/components/forms/user/login.vue'
import SignInForm from '../components/forms/user/signIn.vue'

interface GameOption {
  id: number,
  name: string
}


export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink,
		LoginForm,
		SignInForm
	},

	setup () {
		// Menu of Games
		const leftDrawerOpen = ref(false)
		const games = ref<GameOption[]>([])
		axios.get<GameOption[]>('/api/games')
			.then((res: AxiosResponse<GameOption[]>) => {
				games.value = res.data
			})
			.catch((error) => {
				console.error(error)
			})

		// Auth forms
		const authMode = ref<string>('')
		const isAuthMode = computed<boolean>({
			get: () => {
				return authMode.value !== ''
			},
			set (value) {
				if (!value) {
					authMode.value = ''
				}
			}
		})

		function logIn () {
			authMode.value = 'logIn'
		}

		function signIn () {
			authMode.value = 'signIn'
		}

		function cancelAuth () {
			authMode.value = ''
		}


		return {
			games,
			leftDrawerOpen,
			toggleLeftDrawer () {
				leftDrawerOpen.value = !leftDrawerOpen.value
			},

			isAuthMode,
			authMode,
			logIn,
			signIn,
			cancelAuth
		}
	}
})
</script>
