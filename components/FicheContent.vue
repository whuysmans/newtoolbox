<template>
  <div class="fiche-content">
      <section v-if="fiche.Beschrijving" id="beschrijving" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-hand-point-right', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">Beschrijving</span>
              <div v-html="highlight(fiche.Beschrijving)" class="entry-copy"></div>
          </div>
      </section>
      <section v-if="fiche.Werking" id="werking" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['fas fa-cogs', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">Werking</span>
              <div v-html="highlight(fiche.Werking)" class="entry-copy"></div>
          </div>
      </section>
      <section v-if="fiche.Tips" id="Tips" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-lightbulb', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">Tips</span>
              <div v-html="highlight(fiche.Tips)" class="entry-copy"></div>
          </div>
      </section>
      <section v-if="fiche.Voorbeelden" id="Voorbeelden" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['far fa-image', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">Voorbeelden</span>
              <div v-html="highlight(fiche.Voorbeelden)" class="entry-copy"></div>
          </div>
      </section>
      <section v-if="fiche.Reflectie" id="Reflectie" class="section">
          <div class="container">
              <span class="icon is-small">
                  <i :class="['fab fa-twitch', color]" aria-hidden="true"></i>
              </span>
              <span class="subtitle">Reflectie</span>
              <div v-html="highlight(fiche.Reflectie)" class="entry-copy"></div>
          </div>
      </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['fiche', 'color'],
    methods: {
        ...mapGetters([
            'getCurrentSearchWord'
        ]),
        ...mapActions([
            'setCurrentSearchWord'
        ]),
        highlight (str) {
            if (!str) {
                return ''
            }
            let searchWord = this.getCurrentSearchWord()
            if (searchWord === '') {
                return str
            } else {
                return str.replace(searchWord, (match, a, b) => {
                    return '<span class="highlight">' + match + '</span>'
                })
            }
        }
    }
}
</script>
