import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/style/reset.css';
import '@/assets/style/theme/light.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import PageStatus from '@/components/common/PageStatus';
import { fontResize, redGreen } from '@/directives/index';

Vue.use(Vant);

Vue.prototype.$eventBus = new Vue();

Vue.directive('fontResize', fontResize);
Vue.directive('redGreen', redGreen);

Vue.use(PageStatus);

new Vue({
  render: (h: Vue.CreateElement) => h(App),
  router
}).$mount('#app');
