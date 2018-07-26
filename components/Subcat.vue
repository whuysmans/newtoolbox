<template>
    <div>
        <a :class="{'is-active': isActiveSubcat(subcat.display)}"
        @click="handleSubcatClick(subcat.display)"
            >
            <span v-html="subcat.description"></span>
        </a>
        <fiches-list v-if="isActiveSubcat(subcat.display)" :fiches="filteredFiches"></fiches-list>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FichesList from './FichesList'
export default {
    components: {
        'fiches-list': FichesList
    },
    props: ['subcat', 'fiches'],
    methods: {
        ...mapActions([
            'setActiveSubcat'
        ]),
        ...mapGetters([
            'getActiveSubcat'
        ]),
        handleSubcatClick (display) {
          if (this.getActiveSubcat().trim() === display.trim()) {
              this.setActiveSubcat('')
          } else {
            this.setActiveSubcat(display)
          }
        },
        isActiveSubcat (display) {
          return this.getActiveSubcat().trim() === display
        }
    },
    computed: {
        filteredFiches () {
            let ficheArray = this.fiches
            return ficheArray.filter((fiche) => {
                return this.getActiveSubcat() !== '' ? (fiche.Subcategorie.filter((cat) => {
                    return cat.display.trim() === this.getActiveSubcat().trim()
                }))[0] : ''
            })
        }
        
     }
}
</script>
<style scoped>
    #subcat-buttons a {
        text-decoration: none;
    }
    #subcat-buttons a.is-active {
        color: #0000FF;
    }
</style>
