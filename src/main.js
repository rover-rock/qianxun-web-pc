import VueRouter from 'vue-router'
import store from './store'
import Routers from './router';
import App from './app.vue';
import { setToken, getToken } from '@/libs/util'

// require('../mock/mock')
Vue.use(iview);
Vue.use(VueRouter)
// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);
let HOME_PAGE = "home"
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  const token = getToken();
  console.warn(to.path,'before route..')
  //next()并没有再次执行。原因是相同路径，本身就不会再次执行。。。只是需要执行finish取消动画而已。
  try{
     if (!token && to.path !== '/home')
    next( '/home' )
  else  if( !token && to.path === '/home')
    next()
  else 
      next()
  }
  catch(err){
    console.warn(err)
  }
  finally{
    iview.LoadingBar.finish()
  }
 
  
});

router.afterEach((to, from, next) => {
  iview.LoadingBar.finish();
  window.scrollTo(0, 0);
});

let app = new Vue({
  el: '#app',
  store,
  data: {
    store
  },
  router: router,
  render: h => h(App)
});
