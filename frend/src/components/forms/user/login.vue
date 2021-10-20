<template>
  <q-form>
    <q-input label="Login" v-model="login"/>
    <q-input label="Password" v-model="password" type="password"/>
    <q-btn @click="submit">Log In</q-btn>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../../../store'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const store = useStore()
    const login = ref<string>('')
    const password = ref<string>('')

    function submit () {
      store.dispatch('user/login', {
        login: login.value,
        password: password.value
      })
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      login,
      submit,
      password
    }
  },
})
</script>
