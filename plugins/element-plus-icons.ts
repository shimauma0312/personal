import { defineNuxtPlugin, NuxtApp } from '#app'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    // ElementPlusIconsVueの各コンポーネントをループで登録する
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        // コンポーネントをNuxtアプリケーションに登録する
        nuxtApp.vueApp.component(key, component)
    }
})
