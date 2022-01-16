import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import VueI18n from 'vue-i18n';
import titleMixin from './mixins/titleMixin';
import FontAwesomeIcon from '@/plugins/fontAwesome';
import { registerGlobalComponents } from '@/components/global.js';
import '@/router/beforeEachGuard.js';

import '@/style/app.scss';
import dayjs from 'dayjs';
import '@/plugins/dayjs';

// const i18n = VueI18n.createI18n({
//   legacy: false, // you must set `false`, to use Composition API
//   locale: 'en', // set locale
//   fallbackLocale: 'en', // set fallback locale
//   // messages, // set locale messages
//   // If you need to specify other options, you can set other options
//   // ...
// });

const app = createApp(App);

app.component('fa', FontAwesomeIcon);
app.use(store);
// app.use(i18n);
app.mixin(titleMixin);
app.use(router);
app.mount('#app');

app.config.globalProperties.$dayjs = dayjs;
registerGlobalComponents(app);
