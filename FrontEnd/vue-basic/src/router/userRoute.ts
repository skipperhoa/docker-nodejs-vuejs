// src/router/userRoute.ts
export default [
    {
      path: '/users',
      name: 'UserList',
      component: () => import('@views/pages/user/UserView.vue')
    },
    {
      path: '/users/:id',
      name: 'UserDetail',
      component: () => import('@views/pages/user/UserDetail.vue')
    }
  ]
  