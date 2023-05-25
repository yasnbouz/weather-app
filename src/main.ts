import './styles/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useCityStore } from './store/cities'
const app = createApp(App)

app.use(useCityStore)
app.use(router)

app.mount('#app')
