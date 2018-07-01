<template>
  <div class="container">
      <div class="tabs is-boxed is-medium is-centered">
          <ul>
            <li v-for="thema in themas" 
                :key="thema._id" 
                :class="[getActiveThema() === thema.Titel ? 'is-active' : '']"
                @click="handleThemaClick">
                <a>
                    <span class="icon is-small">
                        <i :class="['fas ' + thema.Icoon, 'tekst-' + thema.Slug]"></i>
                    </span>
                    <span>{{ thema.Titel }}</span>
                    <span 
                        v-if="getActiveThema() === thema.Titel" 
                        class="icon icon-is-small" 
                        @click="handleThemaClick">
                        <i class="fas fa-times"></i>
                    </span>
                </a>
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
        if (this.getActiveThema() === name.trim()) {
            this.setActiveThema('')
        } else {
        this.setActiveThema(name.trim())
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
     },
     themaIsActive () {
         return this.getActiveThema() !== ''
     }
 }
}
</script>

