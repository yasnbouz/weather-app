import { createRouter, createWebHistory } from 'vue-router'
import SearchForm from '@/components/SearchForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchForm
    },
    {
      path: '/location/:id',
      name: 'location',
      component: () => import('@/components/WeatherViewer.vue')
    }
  ]
})

export default router
