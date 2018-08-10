<template>
  <nav class="navbar is-dark">
      <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item" @click.native="handleClearFilterClick()"><strong>Toolbox Formatieve Evaluatie</strong></nuxt-link>
          <button class="navbar-burger" :class="{'is-active': isActiveMenu}" @click="isActiveMenu = !isActiveMenu">
              <span></span>
              <span></span>
              <span></span>
          </button>
      </div>

            <div class="navbar-item has-dropdown search-box" 
                :class="{'is-active': getSearchIsActive()}" 
                >               
              <div class="field navbar-item">
                <div class="control has-icons-left has-icons-right">
                  <input type="text" 
                    class="input" 
                    v-model="search" 
                    ref="input"
                    placeholder="Zoek in de fiches...">
                    <span class="icon is-left">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                    <span class="icon is-right">
                      <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
              <search-element :results="getResults()" :v-show="getSearchIsActive()" />
            </div>

      <div class="navbar-menu" :class="{'is-active': isActiveMenu}">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
            
            <nuxt-link to="/" class="navbar-item is-hoverable" @click.native="handleClearFilterClick()">Home</nuxt-link>
            <nuxt-link to="/bibliografie" class="navbar-item is-hoverable" @click.native="handleClearFilterClick()">Bibliografie</nuxt-link>
            <a href="https://kdg.be" class="navbar-item is-hoverable navbar-item-logo">
              <img src="/Kdg-logo_nl_white.png" class="is-hidden-touch">
              <img src="/Kdg-logo_nl_black.png" class="is-hidden-desktop">
            </a>
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
          isActiveMenu: false
      }
  },
  methods: {
     ...mapGetters([
         'getSearchData',
         'getSearchIsActive'
     ]),
     ...mapActions([
         'setSearchIsActive',
         'setCurrentSearchWord',
         'setShowFilter',
         'setActiveThema',
         'setActiveSubcat'
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
     },
     handleClearFilterClick (event) {
        this.setShowFilter(false)
        this.setActiveThema('')
        this.setActiveSubcat('')
     }
  },
  watch: {
      '$route.path': function () {
          this.setCurrentSearchWord(this.search.trim())
          this.search = ''
          this.setSearchIsActive(false)
          this.isActiveMenu = false
      }
  }
}
</script>

