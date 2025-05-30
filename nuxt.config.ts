import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@/assets/main.css',"element-plus/dist/index.css"
  ],
  build: {
    transpile: ['@element-plus/icons-vue']
  },
  modules: [
    '@element-plus/nuxt',"@nuxt/content"
  ],
  app: {
    baseURL: '/personal/', // リポジトリ名に合わせて設定
    // buildAssetsDir: 'assets',
  },
})
