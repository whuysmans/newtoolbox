<template>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li>
                <nuxt-link to="/">
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
                <a href="#">
                    <span>{{ fiche.Slug }}</span>
                </a>
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
         'setActiveThema'
       ]),
       ...mapGetters([
         'getRelatedSubcats'
       ]),
       handleThemaClick (event) {
           this.setActiveThema(event.target.outerText.trim())
           this.setActiveSubcat('')
           this.$router.push('/')
       },
       handleSubcatClick (event) {
           this.setActiveThema(this.fiche.Kernthemas.display.trim())
           this.setActiveSubcat(event.target.outerText.trim())
           this.$router.push('/')
       }
   }
}
</script>
