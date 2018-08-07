<template>
  <transition name="slidedown">
    <section class="kernthemas" v-show="showFilter">
      <thema v-for="thema in themas" 
            :key="thema._id" 
            :class="thema.Slug"
            :thema="thema"
            :fiches="fiches">
      </thema>
    </section>
  </transition>
</template>
<script>
import Thema from './Thema'
import { mapGetters } from 'vuex'
export default {
    components: {
        'thema': Thema
    },
    props: ['themas', 'fiches'],
    methods: {
      ...mapGetters([
        'getShowFilter'
      ])
    },
    computed: {
      showFilter () {
        return this.getShowFilter()
      }
    }
}
</script>

