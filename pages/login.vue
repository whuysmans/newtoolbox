<template>
    <section class="page-content container">
        <article class="home">
            <header class="article-header">
                <h1 class="article-title">Inloggen Toolbox Formatieve Evaluatie</h1>
            </header>
            <section class="article-content">
                <div class="columns is-centered">
                    <div class="column is-half is-narrow">
                        <div class="field">
                            <label for="password" class="label">Vul hier het wachtwoord voor de toolbox in:</label>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <input 
                                    type="password" 
                                    class="input" 
                                    :class="success ? 'is-success' : 'is-danger'" 
                                    v-model="password" 
                                    placeholder="wachtwoord"
                                    ref="pw-login"
                                    autofocus
                                    autocomplete="nope"
                                    @keyup.enter="handleSubmit">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <span class="icon is-small is-right" >
                                    <i :class="success ? 'fa fa-check' : 'fa fa-warning'"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" @click.prevent="handleSubmit">Submit</button>
                            </div>
                            <div class="control">
                                <button class="button is-text" @click.prevent="cancel">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
  </section>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            password: '',
            success: false
        }
    },
    methods: {
        handleSubmit () {
            console.log('submitted')
            axios.post('https://us-central1-fev-auth.cloudfunctions.net/authenticateMe', {
                data: {
                    jwt: this.password
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((result) => {
                console.log(result.data)
                this.$store.dispatch('setToken', result.data).then(() => {
                this.$router.push('/')
                })
            }).catch((error) => console.log(error))
        },
        cancel () {
            this.$refs['pw-login'].value = ''
            this.$refs['pw-login'].focus()
        }
    }
}
</script>

