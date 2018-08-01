<template>
  <div class="container is-fluid">
      <div class="tabs is-boxed is-medium is-centered">
          <ul>
            <li v-for="thema in themas" 
                :key="thema._id" 
                :class="[(getActiveThema() === thema.Titel || getActiveThema() === thema.Slug) ? 'is-active' : '']"
                @click="handleThemaClick">
                <a>
                    <span class="icon is-small">
                        <i :class="['fas ' + thema.Icoon, 'tekst-' + thema.Slug]"></i>
                    </span>
                    <span>{{ thema.Titel }}</span>
                </a>
            </li>
            
            <li>
              <nuxt-link to="/overzicht">
                <span class="icon is-small">
                    <i class="fas fa-tree"></i>
                </span>
                <span>Sitemap</span>
              </nuxt-link>
            </li>
          </ul>
      </div>
      <thema v-for="thema in themas" 
            :key="thema._id" 
            :class="thema.Slug" 
            class="kernthema-content" 
            :thema="thema"
            :fiches="fiches">
      </thema>
  </div>
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
         'setActiveThema'
     ]),
     ...mapGetters([
         'getActiveThema',
         'getActiveSubcat'
     ]),
     handleThemaClick (event) {
        let name = event.target.outerText
        this.setActiveSubcat('')
        if (this.getActiveThema() === name.trim()) {
            this.setActiveThema('')
        } else {
        this.setActiveThema(name.trim())
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

