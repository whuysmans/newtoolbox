<template>
    <section class="page-content container">
        <tree-view :data="data"></tree-view>
    </section>
</template>
<script>
import Tree from '../components/Tree'
import * as d3 from 'd3'
export default {
    components: {
        'tree-view': Tree
    },
    async asyncData (context) {
      let data = await context.store.getters.getTreeView
      //context.store.dispatch('setActiveThema', '')
      //context.store.dispatch('setActiveSubcat', '')
      return { data: data }
    }
}
</script>
