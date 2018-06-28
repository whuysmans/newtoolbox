<template>
  <section :class="color" class="hero">
      <h1 class="title">
          {{ fiche.Titel }}
      </h1>
      <breadcrumb :fiche="fiche"></breadcrumb>
  </section>
</template>
<script>
import Breadcrumb from './Breadcrumb'
export default {
  components: {
    'breadcrumb': Breadcrumb
  },
  props: ['fiche', 'color']
}
</script>

