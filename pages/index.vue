<template>
  <div class="section">
    <toolbox-filter :themas="themas" :fiches="fiches" id="filter"></toolbox-filter>
    <transition name="fade">
      <section class="section intro-copy columns" v-if="!filterIsActive">
        <div class="container column is-three-fifths">
              <div v-html="homeInfo.Beschrijving"></div>
              <article class="message is-link">
                <div v-html="homeInfo.Extra"></div> 
              </article>
        </div>
        <div class="column">
          <img :src="homeInfo.Afbeelding" /> 
        </div>
      </section>
    </transition>
  </div>
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
