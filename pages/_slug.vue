<template>
  <transition name="page">
      <section class="container">
      <div class="main fiche-main">
          <page-header :fiche="fiche" :color="backgroundColor"></page-header>
          <fiche-content :fiche="fiche" :color="textColor"></fiche-content>
      </div>
      <pagination :slug="fiche.Slug"></pagination>
  </section>
  </transition>
</template>
<script>
import FicheContent from '../components/FicheContent'
import Pagination from '../components/Pagination'
import PageHeader from '../components/PageHeader'
export default {
  components: {
      'fiche-content': FicheContent,
      'pagination': Pagination,
      'page-header': PageHeader
  },
  async asyncData (context) {
      console.log(context.route)
      let fiche = await context.store.getters.getInfoFiche(context.route.params.slug)[0]
      return { fiche: fiche }
  },
  computed: {
      backgroundColor () {
          return this.$store.getters.getClassSlug(this.fiche.Kernthemas.display)
      },
      textColor () {
        return 'tekst-' + this.backgroundColor
      }
  } 
}
</script>

