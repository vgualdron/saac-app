// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

// Cargar variables de entorno
config()

export default defineConfig((ctx) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['i18n', 'axios', 'pwa'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      env: {
        URL_API: ctx.dev ? process.env.URL_API : process.env.URL_API_PROD,
        URL_PANEL: process.env.URL_PANEL,
        LATEST_VERSION_APP: process.env.LATEST_VERSION_APP,
        URL_FILES: process.env.URL_FILES,
        APP_ID_ONE_SIGNAL: process.env.APP_ID_ONE_SIGNAL,
        URL_FRONT: process.env.URL_FRONT,
      },
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      port: 9000,
      open: true, // opens browser window automatically
    },

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'es', // Quasar language pack
      config: {},
      importStrategy: 'auto',
      plugins: ['Notify', 'LocalStorage', 'Dialog', 'Loading'],
      cssAddon: true,
    },

    // Animations
    animations: [],

    // PWA Configuration
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        skipWaiting: true, // Habilita para que el SW se actualice inmediatamente
        clientsClaim: true, // Hace que el SW controle la app inmediatamente
      },
      manifest: {
        name: 'Progress',
        short_name: 'Progress',
        description: 'An amazing PWA built with Quasar Framework',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#65a30d',
        icons: [
          { src: 'icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: 'icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: 'icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: 'icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: 'icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      metaVariables: {
        theme_color: '#65a30d', // El color que quieres para la barra de estado
        background_color: '#ffffff', // El color de fondo del splash
        appleMobileWebAppCapable: 'yes', // Para que funcione en iOS
        appleMobileWebAppStatusBarStyle: 'black-translucent', // Cambia el estilo de la barra de estado en iOS
      },
    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    capacitor: {
      hideSplashscreen: true,
      iosStatusBarPadding: true,
      electron: false,
      appId: 'com.progress.app',
      appName: 'Progress',
      version: '1.0.1',
      android: {
        splashscreen: {
          icon: '/icons/icon.png',
        },
      },
      ios: {
        splashscreen: {
          icon: '/icons/icon.png',
        },
      },
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager', // 'packager' or 'builder'
      packager: {},
      builder: {
        appId: 'progress',
      },
    },

    bex: {
      extraScripts: [],
    },
  }
})
