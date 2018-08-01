<template>
  <nav class="navbar is-dark">
      <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item"><strong>Toolbox Formatieve Evaluatie</strong></nuxt-link>
          <button class="navbar-burger">
              <span></span>
              <span></span>
          </button>
      </div>
      <div class="navbar-menu">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
                  <nuxt-link to="/" class="navbar-item is-hoverable">Home</nuxt-link>
                  <nuxt-link to="/bibliografie" class="navbar-item is-hoverable">Bibliografie</nuxt-link>
                  <nuxt-link to="/" class="navbar-item is-hoverable">Ideeënforum</nuxt-link>
                  <a href="https://kdg.be" class="navbar-item is-hoverable">
                    <img src="https://cipt.be/toolbox/wp-content/uploads/2018/01/KdG_H_Closed-e1515855778724.png" width="112" height="28">
                  </a>
          </div>
      </div>
  </nav>
</template>
<script>
export default {
  props: ['color', 'parent'],
  data () {
      return {
          isActive: false
      }
  }
}
</script>

