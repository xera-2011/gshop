import Vue from "vue"
import VueRouter from 'vue-router'
import router from './router'//路由文件的用index.js,如果用router.js,就要在./router后面补上/router.js(所有文件都适用这个方法)
import App from "./App.vue"
import MintUI from 'mint-ui'
import store from "./store"//引入vuex的store,并挂载到Vue实例
import VueLazyload from 'vue-lazyload'//图片懒加载,要先安装,建议看笔记
import loading from './common/imgs/1.gif'//懒加载动画

import 'mint-ui/lib/style.css'
import "swiper/dist/css/swiper.min.css";
import '../static/mui/css/mui.min.css'
import '../static/css/reset.css'
import './mock/mockServer' // 加载mockServer即可,注意 只有一个点
import './fiters'//加载 时间过滤器

// 局部引入mint-ui
// import { Tabbar, TabItem } from 'mint-ui';
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);

Vue.use(VueRouter)
// 全局化使用VueLazyload(注意要在MintUI之前,不然无法生效)
Vue.use(VueLazyload, {
  loading//使用懒加载动画
})
Vue.use(MintUI)

const vm = new Vue({
  el: "#app",
  render: c => c(App),
  router,//使用vue-router
  store//使用vuex的store
})