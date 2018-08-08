<template>
  <nav id="main-nav" class="tabs is-boxed is-medium">
    <ul>
      <li class="tab-home">
          <nuxt-link to="/" @click.native="setShowFilter(false)">
              <span class="icon is-small">
                  <i class="fas fa-home"></i>
              </span>
          </nuxt-link>
      </li>
    </ul>
    <div class="thema-tabs">
        <ul>
          <li v-for="thema in themas" 
              :key="thema._id" 
              :class="'tab-' + thema.Slug + ' ' + [(getActiveThema() === thema.Titel || getActiveThema() === thema.Slug) ? 'is-active' : '']"
              @click="handleThemaClick">
              <a>
                  <span class="icon is-small">
                      <i :class="['fas ' + thema.Icoon, 'tekst-' + thema.Slug]"></i>
                  </span>
                  <span>{{ thema.Titel }}</span>
              </a>
          </li>
        </ul>
    </div>
    <ul>
      <li class="tab-sitemap">
        <nuxt-link to="/overzicht" @click.native="setShowFilter(false)">
          <span class="icon is-small">
              <i class="fas fa-tree"></i>
          </span>
          <span>Sitemap</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import Thema from './Thema'
import FichesList from './FichesList'
export default {
 components: {
     'thema': Thema,
     'fiches-list': FichesList
 },
 props: ['themas', 'fiches'],
 data () {
     return {
         searchText: ''
     }
 },
 methods: {
     ...mapActions([
         'setActiveSubcat',
         'setActiveThema',
         'setShowFilter',
         'setActiveFiche'
     ]),
     ...mapGetters([
         'getActiveThema',
         'getActiveSubcat'
     ]),
     handleThemaClick (event) {
        let name = event.target.outerText
        this.setShowFilter(true)
        if (this.getActiveThema() === name.trim()) {
            // this.setActiveThema('')
        } else {
            this.setActiveThema(name.trim())
            this.setActiveSubcat('')
            this.setActiveFiche('')
            // this.setShowFilter(true)
        }
     }
 },
 computed: {
     themaIsActive () {
         return this.getActiveThema() !== ''
     },
     subcatIsActive () {
         return this.getActiveSubcat() !== ''
     }
 }
}
</script>

