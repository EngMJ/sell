import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';
import notFound from '@/components/notFount/notFount';
Vue.use(Router);

// 实例化router时是可配置的
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '*',
      name: '404',
      component: notFound
    }
  ]
});
