import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function({ Vue, store }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    // Check for requiredAuth guard
    await store.dispatch('officer/getOfficers');
    const session = store.state.officer.officers.some(i => i.session == true);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log('here 1');
      if (!session) {
        console.log('here 2');
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      console.log('session: ', session);
      if (session) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
