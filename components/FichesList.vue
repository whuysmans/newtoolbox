<template>
    <ul class="unstyled-list fiche-list">
        <li class="fiche-link" v-for="fiche in fiches" :key="fiche.Slug">
            <nuxt-link :to="fiche.Slug">{{ fiche.Slug }}</nuxt-link>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['fiches'],
  methods: {
      ...mapActions([
          'setShowFilter'
      ])
  }
}
</script>

