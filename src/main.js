import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import titleMixin from './mixins/titleMixin';
import FontAwesomeIcon from '@/plugins/fontAwesome';
import { registerGlobalComponents } from '@/components/global.js';

import '@/style/app.scss';
import dayjs from 'dayjs';
import '@/plugins/dayjs';

const app = createApp(App);

app.component('fa', FontAwesomeIcon);
app.use(store);
app.mixin(titleMixin);
app.use(router);
app.mount('#app');

app.config.globalProperties.$dayjs = dayjs;
registerGlobalComponents(app);
