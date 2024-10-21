// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// Import các route
import userRoutes from '@/router/userRoute'
import productRoutes from '@/router/productRoute'

import { useAuthStore } from '../stores/auth'; // Import Pinia store

// Các route khác (nếu có)
const otherRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => HomeView,
    meta: { requiresAuth: false }, // Trang yêu cầu đăng nhập
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@views/pages/product/ProductView.vue'),
       
      },
      ...userRoutes,
      ...productRoutes
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/pages/auth/Login.vue'),
    meta: { guestOnly: true }, // Trang chỉ dành cho khách chưa đăng nhập
  },
]
// Tạo router với tất cả các route
const routes = [
  ...otherRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Sử dụng Pinia để truy cập trạng thái đăng nhập

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Nếu route yêu cầu đăng nhập và người dùng chưa đăng nhập
    if (!authStore.isAuthenticated) {
      next({ name: 'Login' }); // Chuyển hướng đến trang đăng nhập
    } else {
      next(); // Cho phép điều hướng
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // Nếu người dùng đã đăng nhập mà cố vào trang login, chuyển hướng đến trang chủ
    if (authStore.isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next(); // Cho phép truy cập trang login
    }
  } else {
    next(); // Cho phép điều hướng đến các route khác
  }
});

export default router
