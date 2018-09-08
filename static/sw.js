importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "toolbox",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.3adfa5a8b0508e995aae.js",
    "revision": "83609179f1cd8c869f0e73baae838e33"
  },
  {
    "url": "/_nuxt/layouts/default.330d2d64ec222238a4fc.js",
    "revision": "8acd34eb9930c77f8829f225fc081863"
  },
  {
    "url": "/_nuxt/manifest.3382423de17bfaa505a6.js",
    "revision": "19a93f2df3a15a62e6966e9c2c11ca5f"
  },
  {
    "url": "/_nuxt/pages/_slug.e1dd018f26314f961d6c.js",
    "revision": "f3155add81c32466ab343804001b118a"
  },
  {
    "url": "/_nuxt/pages/bibliografie.71d6692561b7d0bb1f3c.js",
    "revision": "3a7efb857562d5006e2a0bc795c85726"
  },
  {
    "url": "/_nuxt/pages/index.9844328cfe1505582b26.js",
    "revision": "7b687bf4e93600e3c4913ac65c551566"
  },
  {
    "url": "/_nuxt/pages/overzicht.1785e43bd9b5857103da.js",
    "revision": "48f0f8a1529a12a249c06a2d9b4f4a44"
  },
  {
    "url": "/_nuxt/vendor.8652d9905d2034028040.js",
    "revision": "2865e3a9746121ddee5d763bf40c4b5f"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

