<template>
  <q-page class="row items-center justify-evenly">
    <login-form/>
    <ul v-if="games">
      <li
        v-for="game in games"
        :key="game.id"
        @click="$router.push(`/game/${game.name.toLowerCase()}`)"
      >
        {{ game.name }}
      </li>
    </ul>
    <h6 v-else>Pls wait, games are loading ...</h6>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { axios } from '../boot/axios'
import LoginForm from '../components/forms/user/login.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    'login-form': LoginForm
  },
  setup() {
    const games = ref<GameOption[]|null>(null)

    async function loadListOfGames(): Promise<GameOption[]|null> {
      try {
        const { data } = await axios.get<GameOption[]>('/api/games')
        games.value = data
        return data
      } catch (e) {
        console.error(e)
        return null
      }
    }
    
    loadListOfGames()
      .catch((e) => console.error(e))

    return {
      games
    };
  }
})

interface GameOption {
  id: number,
  name: string
}
</script>
