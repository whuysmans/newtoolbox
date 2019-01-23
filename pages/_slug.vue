<template>
<!-- <div class="modal" :class="{'is-active': isActive}">
<div class="modal-background"></div>
<div class="modal-content"> -->
<section class="page-content container">
    <article class="fiche" v-if="!getShowFilter()">
        <header class="article-header">
            <h1 class="article-title">
                {{ fiche.Titel }}
            </h1>
            <breadcrumb :fiche="fiche" />
            <div class="article-download">
                <a class="download-button" @click.prevent="download()">
                    <span class="icon is-small">
                      <i class="fas fa-download"></i>
                    </span>
                    <span class="download-button-text">Download deze fiche</span>
                </a>
            </div>
        </header>
        <section class="article-content">
            <fiche-content :fiche="fiche" :color="textColor"></fiche-content> 
        </section>
        <pagination :slug="fiche.Slug"></pagination>
    </article>
</section>
<!-- <button @click="isActive = !isActive" class="modal-close is-large" aria-label="close"></button>
</div>  
</div> -->
</template>
<script>
import FicheContent from '../components/FicheContent'
import Pagination from '../components/Pagination'
import PageHeader from '../components/PageHeader'
import Breadcrumb from '../components/Breadcrumb'
import Filter from '../components/Filter'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  components: {
      'fiche-content': FicheContent,
      'pagination': Pagination,
      'page-header': PageHeader,
      'toolbox-filter': Filter,
      'breadcrumb': Breadcrumb,
  },
  data () {
    return {
      isActive: true
    }
  },
  async asyncData (context) {
      let fiche = await context.store.getters.getInfoFiche(context.route.params.slug)[0]
      console.log(context.route.params.slug)
      return { fiche: fiche }
  },
  computed: {
      backgroundColor () {
        return this.$store.getters.getClassSlug(this.fiche.Kernthemas.display)
      },
      textColor () {
        return 'bg-' + this.backgroundColor
      },
      themas () {
        return this.$store.getters.getKernThemas
      },
      fiches () {
        return this.$store.getters.getInfoFiches
      }
  },
  methods: {
        ...mapActions([
            'setActiveSubcat',
            'setActiveThema',
            'setActiveFiche'
        ]),
        ...mapGetters([
            'getShowFilter'
        ]),
        addListeners () {
            this._links = this.$el.getElementsByTagName('a')
            for (let i = 0; i < this._links.length; i++) {
                if (this._links[i].classList.contains('internal')) {
                    this._links[i].addEventListener('click', this.navigate, false)
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
        },
        download () {
            window.print()
        }
  },
  watch: {
      '$route.path': function () {
         this.removeListeners() 
      }
  },
  mounted () {
      this.addListeners()
      this.setActiveSubcat(this.fiche.Subcategorie[0].display.trim())
      this.setActiveThema(this.fiche.Kernthemas.display.trim())
      this.setActiveFiche(this.fiche.Slug)
  }
}
</script>


