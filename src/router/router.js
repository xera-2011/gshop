// 路由模块对象
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Oder from '../pages/Oder/Oder.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

// 直接 全局暴露 新建的vue路由
export default new VueRouter({
  routes: [
    { path: '/', redirect: '/msite' },
    { path: '/msite', component: MSite,meta: {showFooter:true} },
    { path: '/oder', component: Oder,meta: {showFooter:true} },
    { path: '/profile', component: Profile,meta: {showFooter:true} },
    { path: '/search', component: Search,meta: {showFooter:true} },
    { path: '/login', component: Login }
  ],
  linkActiveClass: 'mui-active'//覆盖默认的路由高亮类 点击哪个 哪个亮
})