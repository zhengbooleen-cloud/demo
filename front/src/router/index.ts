import Vue from 'vue';
import VueRouter from 'vue-router';
import FeaturedQuotes from '@/views/FeaturedQuotes.vue';
import { setTitle, androidCanBackProtocol } from '@/utils/system';

Vue.use(VueRouter);

const routes = [
  // 特色行情
  {
    path: '/home',
    name: 'Home',
    component: FeaturedQuotes,
    meta: { title: '榜单' }
  },
  // 兜底路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];

const createRouter = () => {
  const router: VueRouter = new VueRouter({
    routes,
    scrollBehavior(to: any, from: any, savedPosition: any) {
      return (
        savedPosition || {
          x: 0,
          y: 0
        }
      );
    }
  });

  router.beforeEach((to: { meta: { title: string } }, _from: any, next: () => void) => {
    to.meta?.title && setTitle(to.meta.title);
    androidCanBackProtocol();
    next();
  });

  return router;
};

const routerInstance = createRouter();

export default routerInstance;
