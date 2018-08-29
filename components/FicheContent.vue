<template>
  <div class="fiche-content">
      <section v-if="fiche.Beschrijving" id="beschrijving" class="article-section">
          <h2 class="article-section-title">beschrijving</h2>
          <span :class="['icon is-medium', color]">
                  <i class="far fa-hand-point-right" aria-hidden="true"></i>
          </span>
          <div class="editor-content" v-html="highlight(fiche.Beschrijving)"></div>
      </section>
      <section v-if="fiche.Werking" id="werking" class="article-section">
          <h2 class="article-section-title">werking</h2>
          <span :class="['icon is-medium', color]">
                  <i class="fas fa-cogs" aria-hidden="true"></i>
          </span>
          <div class="editor-content" v-html="highlight(fiche.Werking)"></div>
      </section>
      <section v-if="fiche.Tips" id="tips" class="article-section">
          <h2 class="article-section-title">tips</h2>
          <span :class="['icon is-medium', color]">
                  <i class="far fa-lightbulb" aria-hidden="true"></i>
          </span>
          <div class="editor-content" v-html="highlight(fiche.Tips)"></div>
      </section>
      <section v-if="fiche.Voorbeelden" id="voorbeelden" class="article-section">
          <h2 class="article-section-title">voorbeelden</h2>
          <span :class="['icon is-medium', color]">
                  <i class="far fa-image" aria-hidden="true"></i>
          </span>
          <div class="editor-content" v-html="highlight(fiche.Voorbeelden)"></div>
      </section>
      <section v-if="fiche.Reflectie" id="reflectie" class="article-section">
          <h2 class="article-section-title">reflectie</h2>
          <span :class="['icon is-medium', color]">
                  <i class="fab fa-twitch" aria-hidden="true"></i>
          </span>
          <div class="editor-content" v-html="highlight(fiche.Reflectie)"></div>
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
                    return this.isInLink(str, match) ? match : '<span class="highlight">' + match + '</span>'
                })
            }
        },
        isInLink (s, match) {
            let arr = s.split(' ')
            return arr.filter((part) => {
                return part.indexOf(match) >= 0
            }).filter((matchedPart) => {
                return matchedPart.indexOf('"') >= 0
            }).length > 0
        }
    }
}
</script>
