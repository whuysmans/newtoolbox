<template>
  <div v-if="isActiveThema"> 
      <header class="kernthema-header">
          <h1 class="kernthema-title">
              {{ thema.Titel }}
          </h1>
      </header>
      <section class="kernthema-content" :class="thema.Slug" >
          <div class="editor-content" v-html="thema.Content"></div>
          <section class="subcategories">
              <ul class="unstyled-list subcat-list">
                  <subcat v-for="subcat in thema.Subcat" 
                    :subcat="subcat" 
                    :fiches="fiches" 
                    :key="subcat._id">
                  </subcat>
              </ul>
          </section>
      </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Subcat from './Subcat'
export default {
  components: {
      'subcat': Subcat
  },
  props: ['thema', 'fiches'],
  data () {
      return {
          showExtra: false
      }
  },
  methods: {
      ...mapGetters([
        'getActiveThema',
        'getClassSlug',
        'getActiveSubcat',
        'getShowFilter'
      ])
  },
  computed: {
      isActiveThema () {
          return (this.getActiveThema().trim() === this.thema.Titel || 
                    this.getActiveThema().trim() === this.thema.Slug)
      },
      backgroundColor (title) {
          return this.getClassSlug(title)
      },
      noneActive () {
          return this.getActiveSubcat() === ''
      }
  }
}
</script>




