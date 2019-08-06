import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import store from './store'
import Routers from './router';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
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
