<template>
  <nav class="navbar">
      <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item"><strong>Toolbox Formatieve Evaluatie</strong></nuxt-link>
          <div class="navbar-item has-dropdown" 
                :class="{'is-active': getSearchIsActive()}" 
                >               
              <input type="text" class="input is-small navbar-item" v-model="search" ref="input"/>
              <search-element :results="getResults()" />
          </div>
          <button class="navbar-burger">
              <span></span>
              <span></span>
          </button>
      </div>
      <div class="navbar-menu">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/">Home</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/bibliografie">Bibliografie</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/">Ideeënforum</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <a href="https://kdg.be">
                    <img src="https://cipt.be/toolbox/wp-content/uploads/2018/01/KdG_H_Closed-e1515855778724.png" width="112" height="28">
                  </a>
              </div>
          </div>
      </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Search from './Search'
export default {
  components: {
      'search-element': Search
  },
  data () {
      return {
          search: '',
          isActive: false
      }
  },
  methods: {
     ...mapGetters([
         'getSearchData',
         'getSearchIsActive'
     ]),
     ...mapActions([
         'setSearchIsActive',
         'setCurrentSearchWord'
     ]),
     getResults () {
        let result = null
        if (this.search.length > 2) {
            result = Object.values(this.getSearchData()).filter((item) => {
                return Object.values(item).find((el) => {
                    return el.includes(this.search)
                })
            })
        }
        if (result) {
            this.setSearchIsActive(true)
        }
        return result
     }
  },
  watch: {
      '$route.path': function () {
          this.setCurrentSearchWord(this.search.trim())
          this.search = ''
          this.setSearchIsActive(false)
      }
  }
}
</script>

