<template>
  <div>
    <navbar/>
    <toolbox-filter :themas="themas" :fiches="fiches" id="filter"></toolbox-filter>
    
      <nuxt/>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import { mapGetters } from 'vuex'
export default {
  components: {
    navbar: Navbar,
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
