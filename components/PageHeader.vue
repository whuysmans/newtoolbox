<template>
  <section :class="color" class="hero">
      <h1 class="title">
          {{ fiche.Titel }}
      </h1>
  </section>
</template>
<script>
export default {
  props: ['fiche', 'color']
}
</script>

