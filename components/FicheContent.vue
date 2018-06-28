<template>
  <div class="fiche-content">
      <section v-if="fiche.Beschrijving" id="beschrijving" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-hand-point-right', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">
                  Beschrijving
              </span>
              <div v-html="fiche.Beschrijving"></div>
          </div>
      </section>
      <section v-if="fiche.Werking" id="werking" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['fas fa-cogs', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">
                  Werking
              </span>
              <div v-html="fiche.Werking"></div>
          </div>
      </section>
      <section v-if="fiche.Tips" id="Tips" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-lightbulb', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">
                  Tips
              </span>
              <div v-html="fiche.Tips"></div>
          </div>
      </section>
      <section v-if="fiche.Voorbeelden" id="Voorbeelden" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-image', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">
                 Voorbeelden 
              </span>
              <div v-html="fiche.Voorbeelden"></div>
          </div>
      </section>
      <section v-if="fiche.Reflectie" id="Reflectie" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['fab fa-twitch', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">
                  Reflectie
              </span>
              <div v-html="fiche.Reflectie"></div>
          </div>
      </section>
  </div>
</template>
<script>
export default {
    props: ['fiche', 'color']
}
</script>
