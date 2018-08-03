<template>
  <section class="container content">
      <div>
          <h1>{{ biblio.Titel }}</h1>
          <div class="text-content" v-html="biblio.Content"></div>
      </div>
  </section>
</template>
<script>
export default {
  computed: {
      biblio () {
          return this.$store.getters.getBiblio[0]
      }
  }
}
</script>
