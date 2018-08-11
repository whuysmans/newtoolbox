const axios = require('axios')

module.exports = {

  generate: {
    routes: function () {
      return axios.get('https://staging3.cipt.be/toolbox/wp-json/toolbox/v1/infofiches')
        .then((res) => {
          return res.data.entries.map((fiche) => {
            return '/' + fiche.Slug
          })
        })
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    generate: true,
    routes () {
      return axios.get('https://staging3.cipt.be/toolbox/wp-json/toolbox/v1/infofiches')
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
    title: 'stagingtoolbox2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather|Open+Sans:400,400i,600,700' }
    ]
  },

  css: [
    // { src: 'bulma/bulma.sass', lang: 'sass'},
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss', lang: 'scss'},
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fa-regular.scss', lang: 'scss'},
    { src: '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss', lang: 'scss'},
    // { src: 'assets/main.css'}
    { src: 'assets/style.scss', lang: 'scss'}
  ],

  env: {
    //baseUrl: 'http://localhost:7777/wp-json/toolbox/v1/',
    tokenUrl: 'http://localhost:7777/wp-json/jwt-auth/v1/token',
    baseUrl: 'https://staging3.cipt.be/toolbox/wp-json/toolbox/v1/'
  },

  router: {
    //middleware: 'auth'
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
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
