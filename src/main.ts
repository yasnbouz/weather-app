import './styles/base.css'

import devtools from '@vue/devtools'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
const app = createApp(App)

if (process.env.NODE_ENV === 'development') {
  devtools.connect('127.0.0.1', '5173')
}
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
