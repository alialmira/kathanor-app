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
      }
    ],
  },
  {
    path: '/user',
    component: () => import('layouts/mainLayout.vue'),
    children: [
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
        name: 'manage-account',
        component: () => import('src/pages/ManageAccounts.vue'),
      },
      {
        path: '/201-files',
        name: 'manage-201',
        component: () => import('src/pages/Manage201.vue'),
      },
      {
        path: '/csc-report',
        name: 'manage-csc-report',
        component: () => import('src/pages/ManageCscReport.vue'),
      },
      {
        path: '/report',
        name: 'manage-csc-report',
        component: () => import('src/pages/managereport.vue'),
      },
      {
        path: '/add-document',
        name: 'add-document',
        component: () => import('src/components/AddDocumentPage.vue'),
      },
      {
        path: '/add-employee',
        name: 'add-employee',
        component: () => import('src/components/AddEmployeePage.vue'),
      },
      {
        path: '/add-201',
        name: 'add-201File',
        component: () => import('src/components/Add201.vue'),
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
