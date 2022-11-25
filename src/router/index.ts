import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/login.vue'
import Chat from '@/views/chat/chat.vue'

// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'Chat',
    // component: () => import('@/views/chat/chat.vue'),
    component: Chat,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
