import store from '@/store';
import router from '@/router';

router.beforeEach((to, from) => {
  console.log(to);
  if (store.getters['Auth/isLoggedIn']) {
    return { name: 'default' };
  } else {
    return { name: 'login' };
  }
});
