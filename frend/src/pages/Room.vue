<template>
  <q-page style="padding: 16px 16px">
    <h6>It's a room layout. Room ID: {{ roomId }}</h6>
    <div style="border: 1px black solid">
      <router-view
        v-bind="{
          gameData: roomData.game,
          socket,
          roomId
        }"
        @move="onGameMove"
        @players-changed="onPlayersChanged"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios'
import { computed, defineComponent, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { GameData } from '../components/typesFromBkend/games/reversi/GameData'
import { io, Socket } from 'socket.io-client'

interface RoomData {
  game?: GameData
}

export default defineComponent({
  setup () {
    const route = useRoute()
    const roomId = computed<number>(() => {
      return +route?.params.id
    })
    const roomData = ref<RoomData>({
      game: undefined
    })
    
    const onGameMove = async (args: Record<string, string|number|boolean>) => {
      try {
        const { data: game } = await axios
          .put<Record<string, unknown>>(`api/room/${roomId.value}/game/move`, {
            ...args,
            wsId: socket.id
          })
        roomData.value = Object.assign({}, roomData.value, { game })
      } catch (e) {
        console.error(e)
      }
    }

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
      .on('move', () => {
        fetch()
      })

    onBeforeUnmount(() => {
      socket.disconnect()
    })

    return {
      onGameMove,
      roomData,
      roomId,
      socket
    }
  }
})
</script>
