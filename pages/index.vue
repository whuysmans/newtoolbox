<template>
  <transition name="page">
    <div id="main">
    <section class="section hero">
      <div class="container">
        <h1 class="title">
          {{ homeInfo.Titel }}
        </h1>
        <h2 class="subtitle">
          {{ homeInfo.Subtitle }}
        </h2>
      </div>
    </section>
    <transition name="fade">
      <section class="section intro-copy" v-if="!filterIsActive">
        <div class="container">
              <div v-html="homeInfo.Beschrijving"></div>
              <article class="message is-link">
                <div v-html="homeInfo.Extra"></div> 
              </article>
        </div>
      </section>
    </transition>
    <toolbox-filter :themas="themas" :fiches="fiches" id="filter"></toolbox-filter>
  </div>
  </transition>
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
    console.log(this.$route)
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
