const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  debug: !isProd,
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'ibuos',
    titleTemplate: '%s | ibuos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: '_jASLx_POf2gLCEK6zKk4IWQMU9ntsMnEFIiUASGQGk',
      },
      { name: 'keywords', content: 'ibuos,使っているもの,使っているもの' },
      {
        name: 'description',
        content: '「使っているもの」の管理・共有サービス',
      },
      { name: 'author', content: 'ibuos' },
      { property: 'og:site_name', content: 'ibuos' },
      { hid: 'og:title', property: 'og:title', content: 'ibuos' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '「使っているもの」の管理・共有サービス',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://ibuos.net' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://ibuos.net/images/ibuos@og.png',
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: 'https://ibuos.net',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://ibuos.net/images/ibuos@og.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/notosansjp.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
        integrity:
          'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU',
        crossorigin: 'anonymous',
      },
    ],
  },

  router: {
    middleware: 'clearAlert',
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },

  /*
   ** Global CSS
   */
  css: [
    'firebaseui/dist/firebaseui.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/global.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/firebase', ssr: false },
    { src: '~plugins/bulma', ssr: false },
    { src: '~plugins/moment', ssr: true },
    { src: '~plugins/axios', ssr: true },
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/vue-class-component', ssr: true },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    ...(isProd ? [['@nuxtjs/google-analytics', { id: 'UA-124612395-1' }]] : []),
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false,
        'postcss-nesting': true,
      },
    },
    plugins: isProd
      ? [new Dotenv({ systemvars: true })]
      : [new Dotenv(), new ForkTsCheckerWebpackPlugin()],
    typescript : {
      typeCheck: false // or ForkTsChecker options
    }
  },
};
