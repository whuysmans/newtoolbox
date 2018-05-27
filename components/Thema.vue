<template>
  <div> 
      <div class="themaContent" v-if="isActiveThema">
          <div v-html="thema.Content"></div>
          <a v-if="thema.ExtraContent" @click.prevent.stop="showExtra = true">Lees meer...</a>
          <div v-if="showExtra" class="notification">
              <button class="delete" @click.prevent.stop="showExtra = false"></button>
              <div v-html="thema.ExtraContent"></div>
          </div>
          <div class="tags">
              <a v-for="subcat in thema.Subcat" 
                 :key="subcat._id" 
                 class="tag is-medium"
                 :class="['subcat-' + thema.Slug]"
                 @click.prevent.stop="handleSubcatClick">
                 {{ subcat.display }}
              </a>
          </div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['thema'],
  data () {
      return {
          showExtra: false
      }
  },
  methods: {
      ...mapActions([
        'setActiveSubcat',
        'setActiveThema'
      ]),
      ...mapGetters([
        'getActiveThema',
        'getClassSlug'
      ]),
      handleSubcatClick (event) {
          let subcat = event.target.outerText
          this.setActiveSubcat(subcat)
      }
  },
  computed: {
      isActiveThema () {
          return this.getActiveThema().trim() === this.thema.Titel
      },
      backgroundColor (title) {
          return this.getClassSlug(title)
      }
  }
}
</script>


