
// Đường dẫn này sẽ thay đổi tùy theo cấu trúc dự án của bạn
const userRoutes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        name: 'UserView',
        component: () => import('@views/pages/user/UserView.vue'),
      },
      {
        path: ':id',
        name: 'UserDetail',
        component: () => import('@views/pages/user/UserDetail.vue'),
        props: true,
      },
      {
        path: ':id/edit',
        name: 'UserEdit',
        component: () => import('@views/pages/user/UserEdit.vue'),
        props: true,

      },
    ],
  },
];

export default userRoutes;
