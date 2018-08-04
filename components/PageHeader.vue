<template>
  <section :class="color" class="section hero">
      <h1 class="title">
          {{ fiche.Titel }}
      </h1>
      <breadcrumb :fiche="fiche"></breadcrumb>
      <span class="icon is-small download-button" @click="download()">
        <i class="fas fa-download"></i>
      </span>
  </section>
</template>
<script>
import Breadcrumb from './Breadcrumb'
export default {
  components: {
    'breadcrumb': Breadcrumb
  },
  props: ['fiche', 'color'],
  methods: {
    download () {
      window.print()
    }
  }
}
</script>

