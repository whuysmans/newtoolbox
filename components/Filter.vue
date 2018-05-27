<template>
  <div class="container">
      <div class="tabs is-boxed is-large">
          <ul>
            <li v-for="thema in themas" 
                :key="thema._id" 
                class="tab"
                :class="thema.Slug"
                @click="handleThemaClick">
                <i class="fa" :class="[thema.Icoon, 'tekst-' + thema.Slug]"></i>
                {{ thema.Titel }}
            </li>
        </ul>
      </div>
      <thema v-for="thema in themas" :key="thema._id" :class="thema.Slug" :thema="thema"></thema>
      <fiches-list :fiches="filteredFiches"></fiches-list>
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
        if (this.getActiveThema() === name) {
            this.setActiveThema('')
        } else {
        this.setActiveThema(name)
        }
     }
 },
 computed: {
     filteredFiches () {
         let ficheArray = this.fiches
         return ficheArray.filter((fiche) => {
             return this.getActiveSubcat() !== '' ? (fiche.Subcategorie.filter((cat) => {
                 return cat.display.trim() === this.getActiveSubcat().trim()
             })[0]) : (this.getActiveThema() !== '' ? fiche.Kernthemas.display.trim() === this.getActiveThema().trim()
             : true)
         })
     },
     showFilter () {
         return this.filteredFiches.length !== 0
     }
 }
}
</script>

