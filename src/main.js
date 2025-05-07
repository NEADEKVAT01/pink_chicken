

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import FloatingVue from 'floating-vue'


const pinia = createPinia()
const app = createApp(App)
app.use(FloatingVue)
app.use(pinia)
app.mount('#app')