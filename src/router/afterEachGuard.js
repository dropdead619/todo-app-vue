// import store from '@/store';
import router from '@/router';
import { DEFAULT_TITLE } from '@/config/constants';

router.afterEach((to, from) => {
  nextTick(() => {
    to.meta.title = from.meta.title;
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
