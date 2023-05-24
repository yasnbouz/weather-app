import { createRouter, createWebHistory } from 'vue-router'
import SearchForm from '@/components/SearchForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchForm
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/components/WeatherViewer.vue')
    }
  ]
})

export default router
