const axios = require('axios')

module.exports = {

  generate: {
    routes: function () {
      return axios.get('https://cipt.be/toolbox/wp-json/toolbox/v1/infofiches')
        .then((res) => {
          return res.data.entries.map((fiche) => {
            return '/' + fiche.Slug
          })
        })
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics'
  ],

  'google-analytics': {
    id: 'UA-123790758-2'
  },

  sitemap: {
    generate: true,
    routes () {
      return axios.get('https://cipt.be/toolbox/wp-json/toolbox/v1/infofiches')
      .then((res) => {
        return res.data.entries.map((fiche) =>  {
          return '/' + fiche.Slug
        })
      })
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'formatief evalueren',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: "google-site-verification", content: "oG0i7Fj7I5cpy3zm5XmYmlDBqMjDW_63mXah4vItiis" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700' }
    ]
  },

  css: [
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss', lang: 'scss'},
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fa-regular.scss', lang: 'scss'},
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss', lang: 'scss'},
    { src: 'assets/style.scss', lang: 'scss'}
  ],

  env: {
    baseUrl: 'https://cipt.be/toolbox/wp-json/toolbox/v1/'
  },

  // router: {
  //   scrollBehavior (to, from, savedPosition) {
  //     return { x: 0, y: 0}
  //   }
  //   //middleware: 'auth'
  // },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'babel-es6-polyfill'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
