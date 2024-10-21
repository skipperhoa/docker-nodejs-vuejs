// Đường dẫn này sẽ thay đổi tùy theo cấu trúc dự án của bạn
const productRoutes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        name: 'ProductView',
        component: () => import('@views/pages/product/ProductView.vue'),
      },
      {
        path: ':id',
        name: 'ProductDetail',
        component: () => import('@views/pages/product/ProductDetail.vue'),
        props: true,
      },
      {
        path: ':id/edit',
        name: 'ProductEdit',
        component: () => import('@views/pages/product/ProductEdit.vue'),
        props: true,
      },
    ],
  },
];

export default productRoutes;
