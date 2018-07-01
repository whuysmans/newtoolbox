<template>
  <div>
    <section class="hero">
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
      <section class="section" v-if="!filterIsActive">
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
