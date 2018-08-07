<template>
  <div class="page-wrapper">
    <header class="site-header">
      <navbar/>
      <nav id="filter">
        <toolbox-filter :themas="themas" :fiches="fiches" id="filter"></toolbox-filter>
      </nav>
      <div class="breadcrumb"></div>
    </header>
    <thema-list :themas="themas" :fiches="fiches"></thema-list>
    <nuxt/>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import Breadcrumb from '../components/Breadcrumb'
import ThemaList from '../components/ThemaList'
import { mapGetters } from 'vuex'
export default {
  components: {
    navbar: Navbar,
    'toolbox-filter': Filter,
    'breadcrumb': Breadcrumb,
    'thema-list': ThemaList
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
