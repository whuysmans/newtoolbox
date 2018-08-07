<template>
    <section class="kernthemas">
        <thema v-for="thema in themas" 
            :key="thema._id" 
            :class="thema.Slug"
            :thema="thema"
            :fiches="fiches">
      </thema>
    </section>
</template>
<script>
import Thema from './Thema'
export default {
    components: {
        'thema': Thema
    },
    props: ['themas', 'fiches']
}
</script>

