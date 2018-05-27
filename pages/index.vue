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
    <section class="section">
      <div class="container">
            <div v-html="homeInfo.Beschrijving"></div>
            <article class="message is-link">
              <div v-html="homeInfo.Extra"></div> 
            </article>
      </div>
    </section>
    <toolbox-filter :themas="themas" :fiches="fiches"></toolbox-filter>
  </div>  
</template>

<script>
import axios from 'axios'
import Filter from '../components/Filter'
export default {
  components: {
    'toolbox-filter': Filter
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
    }
  }
}
</script>

<style>

.links {
  padding-top: 15px;
}
</style>
