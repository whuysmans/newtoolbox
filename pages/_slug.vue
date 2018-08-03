<template>
<div class="modal" :class="{'is-active': isActive}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <transition name="page">
      <section class="container">
        <div class="main fiche-main">
            <page-header :fiche="fiche" :color="backgroundColor"></page-header>
            <fiche-content :fiche="fiche" :color="textColor"></fiche-content>
        </div>
        <pagination :slug="fiche.Slug"></pagination>
      </section>
  </transition>
  </div>
  <button @click="isActive = !isActive" class="modal-close is-large" aria-label="close"></button>
</div>
  
</template>
<script>
import FicheContent from '../components/FicheContent'
import Pagination from '../components/Pagination'
import PageHeader from '../components/PageHeader'
import Filter from '../components/Filter'
export default {
  components: {
      'fiche-content': FicheContent,
      'pagination': Pagination,
      'page-header': PageHeader,
      'toolbox-filter': Filter
  },
  data () {
    return {
      isActive: true
    }
  },
  created () {
      console.log(this.$route)
  },
  async asyncData (context) {
      let fiche = await context.store.getters.getInfoFiche(context.route.params.slug)[0]
      return { fiche: fiche }
  },
  computed: {
      backgroundColor () {
        return this.$store.getters.getClassSlug(this.fiche.Kernthemas.display)
      },
      textColor () {
        return 'tekst-' + this.backgroundColor
      },
      themas () {
        return this.$store.getters.getKernThemas
      },
      fiches () {
        return this.$store.getters.getInfoFiches
      }
  }
}
</script>

