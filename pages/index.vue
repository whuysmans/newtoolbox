<template>
  <section class="page-content container">
    <article class="home">
      <header class="article-header">
        <h1 class="article-title">Toolbox Formatieve Evaluatie</h1>
      </header>
      <section class="article-content columns">
        <div class="editor-content column" v-html="homeInfo.Beschrijving"></div>
        <div class="article-figure column">
          <img :src="homeInfo.Afbeelding" />
        </div>
      </section>
    </article>
  </section>
</template>

<script>
import axios from 'axios'
import Filter from '../components/Filter'
import { mapGetters } from 'vuex'
export default {
  components: {
    'toolbox-filter': Filter
  },
  methods: {
    ...mapGetters([
         'getActiveThema',
         'getActiveSubcat'
     ])
  },
  created () {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push('/login')
    }
    if (this.$route.query) {
      if (this.$route.query.thema) {
        this.$store.dispatch('setActiveThema', this.$route.query.thema)
      }
      if (this.$route.query.subcat) {
        this.$store.dispatch('setActiveSubcat', this.$route.query.subcat)
      }
    } else {
      this.$store.dispatch('setActiveThema', '')
      this.$store.dispatch('setActiveSubcat', '')
    }
  },
  computed: {
    themas () {
      return this.$store.getters.getKernThemas
    },
    homeInfo () {
      return this.$store.getters.getHomeInfo
    },
    fiches () {
      return this.$store.getters.getInfoFiches
    },
    filterIsActive () {
      return this.getActiveThema() !== ''
    }
  }
}
</script>

<style>

.links {
  padding-top: 15px;
}
</style>
