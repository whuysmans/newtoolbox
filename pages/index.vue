<template>
  <section class="page-content container">
    <article class="home" v-show="!getShowFilter()">
      <header class="article-header">
        <h1 class="article-title">Toolbox Formatieve Evaluatie</h1>
      </header>
      <section class="article-content columns">
        <div class="editor-content column" v-html="homeInfo.Beschrijving"></div>
        <div class="article-figure column">
          <img :src="homeInfo.Afbeelding" alt="een bekertje inspiratie" />
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
         'getActiveSubcat',
         'getShowFilter'
     ]),
    addListeners () {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
          if (this._links[i].classList.contains('internal')) {
              this._links[i].addEventListener('click', this.navigate, false)
          }
          if (this._links[i].classList.contains('triggerMenu')) {
              this._links[i].addEventListener('click', (event) => {
                event.preventDefault()
                let target = this._links[i].dataset['target']
                this.$store.dispatch('setActiveThema', target)
                this.$store.dispatch('setShowFilter', true)
              })
          }
      }
    
    },
    removeListeners () {
        for (let i = 0; i < this._links.length; i++) {
            this._links[i].removeEventListener('click', this.navigate, false)
        }
    },
    navigate (event) {
        const href = event.target.getAttribute('href')
        if (href) {
            event.preventDefault()
            this.$router.push(href)
        }
    }
  },
  mounted () {
    this.addListeners()
  },
  created () {
    //if (!this.$store.getters.isAuthenticated) {
      //this.$router.push('/login')
    //}
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
  },
  watch: {
      'this.$route.path': function () {
         this.removeListeners() 
      }
  }
}
</script>

<style>

.links {
  padding-top: 15px;
}
</style>
