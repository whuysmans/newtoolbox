<template>
    <div id="fiches-list">
        <nuxt-link class="fiche-link" v-for="fiche in fiches" :to="fiche.Slug" :key="fiche.Slug">{{ fiche.Slug }}</nuxt-link>
    </div>
</template>

<script>
export default {
  props: ['fiches']
}
</script>

