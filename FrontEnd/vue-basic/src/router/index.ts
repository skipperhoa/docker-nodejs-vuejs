// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// Import các route
import userRoutes from '@/router/userRoute'
import productRoutes from '@/router/productRoute'

// Các route khác (nếu có)
const otherRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => HomeView
  }
]
// Tạo router với tất cả các route
const routes = [
  ...otherRoutes,
  ...userRoutes,
  ...productRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
