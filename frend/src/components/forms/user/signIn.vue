<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Sign In</div>
      <q-input label="Login" v-model="name"/>
      <q-input label="Password" v-model="password" type="password"/>
      <q-input label="Confirm" v-model="confirm" type="password"/>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="submit">Log In</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { axios } from '../../../boot/axios'

export default defineComponent({
  name: 'SignInForm',
  setup() {
    const name = ref<string>('')
    const password = ref<string>('')
    const confirm = ref<string>('')

    function submit () {
      axios.post('api/user/signin', {
        name: name.value,
        password: password.value,
        confirm: confirm.value
      })
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      name,
      submit,
      password,
      confirm
    }
  },
})
</script>
