import VueRouter from 'vue-router'
import store from './store'
import Routers from './router';
import App from './app.vue';
import { setToken, getToken, canTurnTo } from '@/libs/util'


Vue.use(iview);
Vue.use(VueRouter)
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, Routers )) next() // 有权限，可访问
    else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
  }

router.beforeEach((to, from, next) => {
    iview.LoadingBar.start();
    const token = getToken();
    if (!token && to.name !== 'login') {
        // 未登录且要跳转的页面不是登录页
        next({
          name: 'login' // 跳转到登录页
        })
      } else if (!token && to.name === 'login') {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
      } else if (token && to.name === 'login') {
        // 已登录且要跳转的页面是登录页
        next({
          name: 'home' // 跳转到home页
        })
      } else {
        if (store.state.hasGetUserInfo) {
          turnTo(to, store.state.user.access, next)
        } else {
          store.dispatch('get_user_info').then(user => {
            // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
            // turnTo(to, user.access, next)
            next()
          }).catch(() => {
            setToken('')
            next({
              name: 'login'
            })
          })
        }
      }
    next();
});

router.afterEach((to, from, next) => {
    iview.LoadingBar.finish();
    window.scrollTo(0, 0);
});

let app = new Vue({
    el: '#app',
    store,
    data:{
        store
    },
    router: router,
    render: h => h(App)
});
