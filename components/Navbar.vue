<template>
  <nav class="navbar is-dark">
      <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item site-logo" @click.native="handleClearFilterClick()"><strong>Toolbox Formatieve Evaluatie</strong></nuxt-link>

          <div class="mobile-navbar">
            <ul class="is-hidden-desktop inline-list unstyled-list">
              <li class="tab-home">
                  <nuxt-link to="/" @click.native="handleClearFilterClick()">
                      <span class="icon is-small">
                          <i class="fas fa-home"></i>
                      </span>
                  </nuxt-link>
              </li>
              <li class="tab-sitemap">
                <nuxt-link to="/overzicht" @click.native="setShowFilter(false)">
                  <span class="icon is-small">
                      <i class="fas fa-sitemap"></i>
                  </span>
                </nuxt-link>
              </li> 
            </ul>

            <button class="navbar-burger" 
                aria-label="navigation toggle"
                :class="{'is-active': isActiveMenu}" 
                @click="isActiveMenu = !isActiveMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
          </div>
      </div>

            <div class="navbar-item has-dropdown search-box" 
                :class="{'is-active': getSearchIsActive()}" 
                >               
              <div class="field navbar-item">
                <div class="control has-icons-left has-icons-right">
                  <input type="text" 
                    class="input is-small" 
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
              <search-element :results="getResults()" :v-if="getSearchIsActive()" />
            </div>

      <div class="navbar-menu" :class="{'is-active': isActiveMenu}">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
            
            <nuxt-link to="/" class="navbar-item is-hoverable" @click.native="handleClearFilterClick()">Home</nuxt-link>
            <nuxt-link to="/bibliografie" class="navbar-item is-hoverable" @click.native="handleClearFilterClick()">Bibliografie</nuxt-link>
            <nuxt-link to="/samenwerking" class="navbar-item is-hoverable" @click.native="handleClearFilterClick()">Samenwerking</nuxt-link>
            <a href="https://kdg.be" class="navbar-item is-hoverable navbar-item-logo">
              <img src="/Kdg-logo_Expert_nl_white.png" class="is-hidden-touch">
              <img src="/Kdg-logo_Expert_nl_black.png" class="is-hidden-desktop">
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
        let result = false
        if (this.search.length > 2) {
            result = Object.values(this.getSearchData()).filter((item) => {
                return Object.values(item).filter((el) => {
                    return el.indexOf(this.search) >= 0
                })[0]
            })
        }
        if (result) {
            this.setSearchIsActive(true)
        } else {
            this.setSearchIsActive(false)
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

