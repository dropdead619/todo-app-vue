import store from '@/store';
import router from '@/router';

router.beforeEach((to, from) => {
  if (store.getters['auth/isLoggedIn']) {
    if (to.meta.onlyLoggedOut) {
      return { name: 'default' };
    } else {
      return;
    }
  }

  if (!to.meta.onlyLoggedOut) {
    return { name: 'auth' };
  }
});
