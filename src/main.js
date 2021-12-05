import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import titleMixin from './mixins/titleMixin';
import FontAwesomeIcon from '@/plugins/fontAwesome';

import BaseModal from './components/UI/BaseModal';
import BasePreloader from './components/UI/BasePreloader';

import '@/style/app.scss';

const app = createApp(App);
app.component('BaseModal', BaseModal);
app.component('BasePreloader', BasePreloader);
app.component('fa', FontAwesomeIcon);
app.use(store);
app.mixin(titleMixin);
app.use(router);
app.mount('#app');
