import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', 
        name: 'homepage',
        component: () => import('src/pages/HomePage.vue') 
      },

      {
        path: '/login',
        name: 'login-page',
        component: () => import('src/pages/Login.vue')
      },
      {
        path: '/ManageAccount',
        name: 'manageaccount-page',
        component: () => import('pages/ManageAccount.vue')
      },
      {
        path: '/ManageDocument',
        name: 'managedocument-page',
        component: () => import('pages/ManageDocument.vue')
      },
      {
        path: '/ManageContact',
        name: 'managecontact-page',
        component: () => import('pages/ManageContact.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
