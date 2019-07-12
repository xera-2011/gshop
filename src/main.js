import Vue from "vue"
import VueRouter from 'vue-router'
import router from './router/router.js'
import App from "./App.vue"
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
import "swiper/dist/css/swiper.min.css";
import '../static/mui/css/mui.min.css'
import '../static/css/reset.css'

// 局部引入mint-ui
// import { Tabbar, TabItem } from 'mint-ui';
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);

Vue.use(VueRouter)
Vue.use(MintUI)

const vm = new Vue({
  el: "#app",
  render: c => c(App),
  router
})