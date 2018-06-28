<template>
  <div> 
      <div class="themaContent" v-if="isActiveThema">
          <div v-html="thema.Content"></div>
          <a v-if="thema.ExtraContent" @click.prevent.stop="showExtra = true">Lees meer...</a>
          <div v-if="showExtra" class="notification">
              <button class="delete" @click.prevent.stop="showExtra = false"></button>
              <div v-html="thema.ExtraContent"></div>
          </div>
          <div class="buttons">
              <a v-for="subcat in thema.Subcat" 
                 :key="subcat._id" 
                 class="button"
                 :class="{'is-active': isActiveSubcat(subcat.display)}"
                 @click="handleSubcatClick"
                 >
                 {{ subcat.display }}
              </a>
              <a v-if="!noneActive"
                class="button is-outlined"
                @click="clearFilter"
              >
                <span>clearFilter</span>
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
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
        'getClassSlug',
        'getActiveSubcat'
      ]),
      handleSubcatClick (event) {
          console.log(event.target)
          let subcat = event.target.outerText
          this.setActiveSubcat(subcat)
      },
      isActiveSubcat (display) {
          return this.getActiveSubcat().trim() === display
      },
      clearFilter () {
          this.setActiveSubcat('')
      }
  },
  computed: {
      isActiveThema () {
          return this.getActiveThema().trim() === this.thema.Titel
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


