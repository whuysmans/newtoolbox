<template>
  <div class="container">
      <div class="field">
          <label for="input" class="label"></label>
      </div>
      <div class="field">
          <input 
            type="password" 
            v-model="password"
            placeholder="wachtwoord"
            ref="pw-login"
            autofocus
            @keyup.enter="submit"
            class="input">
      </div>
      <div class="field is-grouped">
          <div class="control">
              <button class="button" @click.prevent="submit">Submit</button>
              <button class="button" @click.prevent="cancel">Cancel</button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
      return {
          password: ''
      }
  },
  methods: {
      submit () {
          const params = {
            username: 'dewerner',
            password: this.password
          }
          axios.post(process.env.tokenUrl, params).then((result) => {
              this.$store.dispatch('setToken', result.data.token).then(() => {
                  this.$router.push('/')
              })
          })
      }
  }
}
</script>

