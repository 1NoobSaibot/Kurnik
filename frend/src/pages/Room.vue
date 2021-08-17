<template>
  <q-page style="padding: 16px 16px">
    <h6>It's a room layout</h6>
    <div style="border: 1px black solid">
      <router-view :room-id="$route.query.roomId || 0"/>
    </div>
  </q-page>
</template>

<script lang="js">
export default {
  created () {
    console.log('Room.vue: created')
  },
  mounted () {
    console.log('Room.vue: mounted')
  }
}
</script>
