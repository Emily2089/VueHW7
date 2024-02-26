import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/UserHome.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/UserAbout.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/UserCarts.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/CheckoutView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/AdminCoupons.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
