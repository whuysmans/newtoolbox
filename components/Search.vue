<template>
    <div class="navbar-item navbar-dropdown is-boxed">
        <nuxt-link 
            v-for="result in results" 
            :key="result.slug" 
            class="navbar-item" 
            :to="result.slug">
            {{ result.slug }}
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: ['results']
}
</script>
