<template>
  <section class="page-content container">
    <article class="biblio">
      <header class="article-header">
        <h1 class="article-title">
          {{ biblio.Titel }}
        </h1>
      </header>
      <section class="article-content">
        <div class="editor-content" v-html="biblio.Content"></div>
      </section>
    </article>
  </section>
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
