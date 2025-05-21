import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/popup',
    name: 'detail',
    component: () => import('@/views/PopupView.vue')
    }
  ]
})

export default router
