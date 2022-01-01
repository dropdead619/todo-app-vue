import { createRouter, createWebHashHistory } from 'vue-router';
import TheEmptyRouterView from '@/components/TheEmptyRouterView.vue';

const routes = [
  {
    path: '/',
    redirect: '/tasks/main',
  },
  {
    path: '/tasks',
    component: TheEmptyRouterView,
    children: [
      {
        path: 'main',
        name: 'TasksMain',
        component: () => import(/* webpackChunkName: "tasks" */ '../views/TasksMain.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: TheEmptyRouterView,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import(/* webpackChunkName: "user" */ '../views/UserProfile.vue'),
      },
    ],
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
