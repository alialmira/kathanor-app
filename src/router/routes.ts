import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'log-in',
        component: () => import('src/pages/Login.vue'),
      },
      {
        path: '/home',
        name: 'home-user',
        component: () => import('src/pages/homeUser.vue'),
      },
      {
        path: '/employee',
        name: 'manage-employee',
        component: () => import('src/pages/ManageEmployee.vue'),
      },
      {
        path: '/accounts',
        name: 'manage-employee',
        component: () => import('src/pages/ManageAccounts.vue'),
      },
      {
        path: '/201-files',
        name: 'manage-201',
        component: () => import('src/pages/Manage201Files.vue'),
      },
      {
        path: '/csc-report',
        name: 'manage-csc-report',
        component: () => import('src/pages/ManageCscReport.vue'),
      },
      {
        path: '/indiv-report',
        name: 'manage-indiv-report',
        component: () => import('src/pages/ManageIndividualReport.vue'),
      },
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
