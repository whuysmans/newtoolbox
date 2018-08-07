<template>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li>
                <nuxt-link to="/">
                    <span class="icon is-small">
                        <i class="fas fa-home" aria-hidden="true"></i>
                    </span>
                    <span>Toolbox</span>
                </nuxt-link>
            </li>
            <li v-if="activeThema">
                <a href="#" @click="handleThemaClick">
                    <span>{{ getActiveThema() }}</span>
                </a>
            </li>
            <li v-if="activeSubcat">
                <a href="#" @click="handleSubcatClick">
                    <span>{{ getActiveSubcat() }}</span>
                </a>
            </li>
            <li v-if="isFiche">
                <a href="#">
                    <span>huidige fiche</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
      return {
        isFiche: false
      }
    },
    mounted () {
      this.setIsFiche()
    },
    watch: {
      '$route.path': function () {
        this.setIsFiche()
      }
    },
    methods: {
       ...mapActions([
         'setActiveSubcat',
         'setActiveThema'
       ]),
       ...mapGetters([
         'getRelatedSubcats',
         'getActiveThema',
         'getActiveSubcat'
       ]),
       handleThemaClick (event) {
           this.setActiveThema(event.target.outerText.trim())
           this.setActiveSubcat('')
           this.$router.push('/')
       },
       handleSubcatClick (event) {
           this.setActiveThema(this.fiche.Kernthemas.display.trim())
           this.setActiveSubcat(event.target.outerText.trim())
           this.$router.push('/')
       },
       setIsFiche () {
        if ( this.$route.name === 'slug' ) {
          console.log(this.$route)
          this.isFiche = true
        } else {
          this.isFiche = false
        }
      }
    },
    computed: {
      activeThema () {
        return this.getActiveThema() !== ''
      },
      activeSubcat () {
        return this.getActiveSubcat() !== ''
      }

    }
}
</script>
