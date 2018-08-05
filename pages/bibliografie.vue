<template>

  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- <transition name="page"> -->
        <section class="container content">
          <h1 class="page-title">{{ biblio.Titel }}</h1>
          <div class="text-content" v-html="biblio.Content"></div>
        </section>
    <!-- </transition> -->
    </div>
    <button @click="isActive = !isActive" class="modal-close is-large" aria-label="close"></button>
  </div>

</template>
<script>
export default {
  computed: {
      biblio () {
          return this.$store.getters.getBiblio[0]
      }
  },
  data () {
    return {
      isActive: true
    }
  },
  created () {
    this.isActive = true
  }
}
</script>
