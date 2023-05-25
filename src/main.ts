import './styles/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { citiesStore, key } from './store/cities'
const app = createApp(App)

app.use(citiesStore, key)
app.use(router)

app.mount('#app')
