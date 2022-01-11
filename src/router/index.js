import { createRouter, createWebHashHistory } from 'vue-router';
import TheEmptyRouterView from '@/components/TheEmptyRouterView.vue';

const routes = [
  {
    path: '/auth',
    meta: {
      onlyLoggedOut: true,
    },
    component: () => import(/* webpackChunkName: "auth" */ '@/layouts/TheLayoutLogin.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'default',
    redirect: '/tasks/main',
    component: () => import(/* webpackChunkName: "default" */ '@/layouts/TheLayoutDefault.vue'),
    children: [
      {
        path: '/tasks',
        component: TheEmptyRouterView,
        children: [
          {
            path: 'main',
            name: 'TasksMain',
            component: () => import(/* webpackChunkName: "tasks" */ '../views/TasksMain.vue'),
          },
          {
            path: 'archived',
            name: 'TasksArchive',
            component: () => import(/* webpackChunkName: "tasks" */ '../views/TasksArchive.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/errors/Error404.vue'),
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
