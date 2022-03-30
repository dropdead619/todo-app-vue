import { createRouter, createWebHashHistory } from 'vue-router';
import TheEmptyRouterView from '@/components/TheEmptyRouterView.vue';

const routes = [
  {
    path: '/auth',
    meta: {
      onlyLoggedOut: true,
    },
    component: () => import('@/layouts/TheLayoutLogin.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('@/views/auth/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'default',
    redirect: '/tasks/main',
    component: () => import('@/layouts/TheLayoutDefault.vue'),
    children: [
      {
        path: '/tasks',
        component: TheEmptyRouterView,
        children: [
          {
            path: 'main',
            name: 'TasksMain',
            component: () => import('../views/TasksMain.vue'),
          },
          {
            path: 'archived',
            name: 'TasksArchive',
            component: () => import('../views/TasksArchive.vue'),
          },
        ],
      },
      {
        path: '/tags',
        component: TheEmptyRouterView,
        children: [
          {
            path: '',
            name: 'TagsMain',
            component: () => import('../views/TagsMain.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage404',
    component: () => import('@/views/errors/ErrorPage404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
});

export default router;
