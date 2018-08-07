<template>
    <div :class="{'is-active': isActiveSubcat(subcat.display)}" class="column subcat">
        <h3 class="subcat-title">
            {{ subcat.display }}
        </h3>
        <div class="subcat-description editor-content"
            v-html="subcat.description">

        </div>
        <a class="subcat-link subcat-link-toon" v-if="!isActiveSubcat(subcat.display)" @click.prevent="handleSubcatClick(subcat.display)">Toon de fiches</a>
        <transition name="fade">
          <fiches-list v-if="isActiveSubcat(subcat.display)" :fiches="filteredFiches"></fiches-list>
        </transition>
        <a class="subcat-link subcat-link-verberg" v-if="isActiveSubcat(subcat.display)" @click.prevent="handleSubcatClick(subcat.display)">Verberg de fiches</a>
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
