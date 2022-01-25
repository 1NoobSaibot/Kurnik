<template>
  <q-page style="padding: 16px 16px">
    <h6>It's a room layout. Room ID: {{ roomId }}</h6>
    <div style="border: 1px black solid">
      <game-select
        v-if="gameComponent === undefined"
        :room-id="roomId"
        :wsId="socket.id"
        @created="onGameCreated"
      />
      <component
        v-else
        v-bind:is="gameComponent"
        :socket="socket"
        :id="gameId"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios'
import { computed, defineComponent, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { io, Socket } from 'socket.io-client'
import ReversiGame from 'components/games/reversi/ReversiGame.vue'
import GameSelect from 'components/GameSelect.vue'

interface GameData {
  id: number, name: string
}

interface RoomData {
  game?: GameData
}

export default defineComponent({
  components: {
    GameSelect,
    ReversiGame
  },
  setup () {
    const route = useRoute()
    const roomId = computed<number>(() => {
      return +route?.params.id
    })
    const roomData = ref<RoomData>({
      game: undefined
    })
    const gameId = computed<number|undefined>(() => {
      return roomData.value.game?.id
    })
    const gameComponent = computed<string|undefined>(() => {
      const name = roomData.value.game?.name
      if (name) {
        return name + 'Game'
      }
      return undefined
    })

    const fetch = () => {
      axios.get<RoomData>(`api/room/${roomId.value}`)
        .then(({ data }) => {
          roomData.value = data
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const socket: Socket = io('/room', {
      transports: ['websocket'],
      // TODO: Use Authorization
      query: { userId: '7', roomId: roomId.value.toString() }
    })
    socket
      .on('connect', () => {
        console.log('Socket has been connected.')
        fetch()
      })
      .on('connect_error', (...args) => {
        console.log('Connect ERROR', args)
      })

    onBeforeUnmount(() => {
      socket.disconnect()
    })

    function onGameCreated (game: GameData) {
      roomData.value = Object.assign({}, roomData.value, { game })
    }

    return {
      roomData,
      roomId,
      socket,
      gameId,
      gameComponent,
      onGameCreated
    }
  }
})
</script>
