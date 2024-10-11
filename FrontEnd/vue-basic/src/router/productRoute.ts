// src/router/productRoute.ts
export default [
    {
      path: '/products',
      name: 'ProductView',
      component: () => import('@views/pages/product/ProductView.vue')
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('@views/pages/product/ProductDetail.vue')
    },
    {
      path: '/products/:id/edit',
      name: 'ProductEdit',
      component: () => import('@views/pages/product/ProductEdit.vue')
    }
  ]
  