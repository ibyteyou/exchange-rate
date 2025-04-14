import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/convert',
      name: 'convert',
      component: () => import('../views/Convert.vue'),
    },
  ],
})

export default router
