import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'log-in',
        component: () => import('src/pages/Login.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('layouts/mainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home-user',
        meta: { requiresAuth: true },
        component: () => import('src/pages/homeUser.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('src/pages/Profile.vue'),
      },
      {
        path: '/accounts',
        name: 'manage-account',
        meta: { requiresAuth: true },
        component: () => import('src/pages/ManageAccounts.vue'),
      },
      {
        path: '/201-files',
        name: 'manage-201',
        meta: { requiresAuth: true },
        component: () => import('src/pages/Manage201.vue'),
      },
      {
        path: '/csc-report',
        name: 'manage-report',
        meta: { requiresAuth: true },
        component: () => import('src/pages/ManageCscReport.vue'),
      },
      {
        path: '/report',
        name: 'manage-csc-report',
        meta: { requiresAuth: true },
        component: () => import('src/pages/managereport.vue'),
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it

  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
