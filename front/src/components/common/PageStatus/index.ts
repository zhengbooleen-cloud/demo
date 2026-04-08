import PageStatusComponent from './PageStatus.vue';
import { VueConstructor } from 'vue/types/umd';

const PageStatus = {
  install(Vue: VueConstructor) {
    const PageStatusConstructor = Vue.extend(PageStatusComponent);
    // 创建pageStatus实例
    const pageStatusInstance = new PageStatusConstructor().$mount();
    // 挂载body
    const mountDom = document.querySelector('body');
    if (mountDom) {
      mountDom.appendChild(pageStatusInstance.$el);
    } else {
      throw new Error('[pageStatus] portal cannot find mount target');
    }
    Vue.prototype.$pageStatus = pageStatusInstance;
  }
};


export default PageStatus;
