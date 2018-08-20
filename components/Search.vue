<template>
    <div class="navbar-item navbar-dropdown is-boxed">
        <nuxt-link 
            v-for="result in results" 
            :key="result.slug" 
            class="navbar-item" 
            :to="result.slug"
            @click.native="setShowFilter(false)">
            {{ result.titel }}
        </nuxt-link>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: ['results'],
    methods: {
      ...mapActions([
        'setShowFilter'
      ])
    }
}
</script>
