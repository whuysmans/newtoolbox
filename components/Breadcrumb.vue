<template>
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
            <li>
                <nuxt-link to="/" @click.native="handleClearFilterClick()">
                    <span class="icon is-small">
                        <i class="fas fa-home" aria-hidden="true"></i>
                    </span>
                    <span>Home</span>
                </nuxt-link>
            </li>
            <li>
                <a href="#" @click="handleThemaClick">
                    <span>{{ fiche.Kernthemas.display }}</span>
                </a>
            </li>
            <li>
                <a href="#" @click="handleSubcatClick">
                    <span>{{ fiche.Subcategorie[0].display }}</span>
                </a>
            </li>
            <li class="is-active">
                <span>{{ fiche.Titel }}</span>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
   props: ['fiche'],
   
   methods: {
       ...mapActions([
         'setActiveSubcat',
         'setActiveThema',
         'setShowFilter',
         'setActiveFiche'
       ]),
       ...mapGetters([
         'getRelatedSubcats'
       ]),
       handleThemaClick (event) {
           this.setActiveThema(event.target.innerText.trim())
           this.setActiveSubcat('')
           this.setActiveFiche('')
           this.setShowFilter(true)
       },
       handleSubcatClick (event) {
           this.setActiveThema(this.fiche.Kernthemas.display.trim())
           this.setActiveSubcat(event.target.innerText.trim())
           this.setActiveFiche('')
           this.setShowFilter(true)
       },
       handleClearFilterClick (event) {
           this.setShowFilter(false)
           this.setActiveThema('')
           this.setActiveSubcat('')
           this.setActiveFiche('')
       }
   }
}
</script>
