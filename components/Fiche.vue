<template>
  <section class="container">
      <div class="main">
          <h2 class="title">
              {{ fiche.Titel }}
          </h2>
          <div class="beschrijving">
              <article class="media">
                  <div class="media-left">
                      <span class="icon">
                          <i class="fa fa-3x" :class="fiche.BeschrijvingsIcoon">
                          </i>
                      </span>
                  </div>
                  <div class="media-content">
                      <h3 class="subtitle">
                          Beschrijving
                      </h3>
                      <div v-html="fiche.Beschrijving"></div>
                  </div>
              </article>
          </div>
          <div class="werking">
              <article class="media">
                  <div class="media-left">
                      <span class="icon">
                          <i class="fa fa-3x" :class="fiche.WerkingIcoon"></i>
                      </span>
                  </div>
                  <div class="media-content">
                      <h3 class="subtitle">
                          Werking
                      </h3>
                      <div v-html="fiche.Werking"></div>
                  </div> 
              </article>
          </div>
          <div class="tips">
              <article class="media">
                  <div class="media-left">
                      <span class="icon">
                          <i class="fa fa-3x" :class="fiche.TipsIcoon"></i>
                      </span>
                  </div>
                  <div class="media-content">
                      <h3 class="subtitle">
                         Tips 
                      </h3>
                      <div v-html="fiche.Tips"></div>
                  </div> 
              </article>
          </div>
          <div class="voorbeelden">
              <article class="media">
                  <div class="media-left">
                      <span class="icon">
                          <i class="fa fa-3x" :class="fiche.VoorbeeldenIcoon"></i>
                      </span>
                  </div>
                  <div class="media-content">
                      <h3 class="subtitle">
                         Voorbeelden 
                      </h3>
                      <div v-html="fiche.Voorbeelden"></div>
                  </div> 
              </article>
          </div>
      </div>
  </section>
</template>
<script>
export default {
  props: ['fiche']
}
</script>
