<template>
  <div class="page-wrapper">
    <header class="site-header">
      <navbar/>
      <nav id="filter">
        <toolbox-filter :themas="themas" :fiches="fiches"></toolbox-filter>
      </nav>
    </header>
    <thema-list :themas="themas" :fiches="fiches"></thema-list>
    

    <transition name="fade">
      <nuxt/>
    </transition>

    <footer class="site-footer">
      credits, how to.
    </footer><!-- end site-footer -->
  </div><!-- end site-wrapper -->
</template>

<script>
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import BreadcrumbSite from '../components/BreadcrumbSite'
import ThemaList from '../components/ThemaList'
import { mapGetters } from 'vuex'
export default {
  components: {
    navbar: Navbar,
    'toolbox-filter': Filter,
    'breadcrumb-site': BreadcrumbSite,
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
