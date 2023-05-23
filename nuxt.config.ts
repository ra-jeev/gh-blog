export default defineNuxtConfig({
  extends: 'content-wind',
  app: {
    baseURL: '/gh-blog/', // baseURL: '/<repository>/'
  },
  modules: ['nuxt-vuefire'],
  ssr: true,
  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
  },
  runtimeConfig: {
    public: {
      START_CODESPACE_FN_URL: process.env.START_CODESPACE_FN_URL,
    },
  },
});
