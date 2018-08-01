<template>
  <div> 
      <div class="themaContent" :class="thema.Slug" v-if="isActiveThema">
          <div v-html="thema.Content"></div>
          <div class="notification" id="subcat-buttons">
              <subcat v-for="subcat in thema.Subcat" :subcat="subcat" :fiches="fiches" :key="subcat._id"></subcat>
          </div>
      </div>
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
        'getActiveSubcat'
      ])
  },
  computed: {
      isActiveThema () {
          return this.getActiveThema().trim() === this.thema.Titel || 
                    this.getActiveThema().trim() === this.thema.Slug
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




