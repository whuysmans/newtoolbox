<template>
  <nav class="navbar">
      <div class="navbar-brand">
          <button class="navbar-burger">
              <span></span>
              <span></span>
          </button>
      </div>
      <div class="navbar-menu">
          <div class="navbar-start">
          </div>
          <div class="navbar-end">
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/">Home</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/bibliografie">Bibliografie</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <nuxt-link to="/">Ideeënforum</nuxt-link>
              </div>
              <div class="navbar-item is-hoverable">
                  <a href="https://kdg.be">
                    <img src="https://cipt.be/toolbox/wp-content/uploads/2018/01/KdG_H_Closed-e1515855778724.png" width="112" height="28">
                  </a>
              </div>
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

