import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import i18n from './plugins/i18n';

import { registerGlobalComponents } from '@/components/global.js';
import '@/router/beforeEachGuard.js';
import '@/router/afterEachGuard.js';

import '@/style/app.scss';
import dayjs from 'dayjs';
import '@/plugins/dayjs';

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(router);
app.mount('#app');

app.config.globalProperties.$dayjs = dayjs;
registerGlobalComponents(app);
