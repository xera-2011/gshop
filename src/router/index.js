// 路由模块对象
import Vue from 'vue'
import VueRouter from 'vue-router'
// 常规引入路由组件方法
// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

// 路由组件懒加载方法(当加载函数时,才会加载该路由)
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import UserInfo from '../pages/MSite/UserInfo.vue'

import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'

// 全局注册Vue-router组件
Vue.use(VueRouter)

// 直接 全局暴露 新建的vue路由
export default new VueRouter({
  //  去掉地址中的哈希#
  // mode: 'history',
  // 项目所有路由地址 数组
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,// 此时的Msite等都是返回路由组件的函数，只有请求对应的路由路径时(第一次)才会执行此函数并加载路由组件
      meta: { showFooter: true }// 标识此路由是否显示FooterGuide
    },
    {
      path: '/order',
      component: Order,
      meta: { showFooter: true }
    },
    {
      path: '/profile',
      component: Profile,
      meta: { showFooter: true }
    },
    {
      path: '/search',
      component: Search,
      meta: { showFooter: true }
    },
    {
      path: '/userinfo',
      component: UserInfo,
      meta: { showFooter: true }
    },
    {
      path: '/shop',
      component: Shop,
      children: [{
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }]
    },

    {
      path: '/login',
      component: Login
    }
  ]
  // linkActiveClass: 'mui-active'//覆盖默认的路由高亮类 点击哪个 哪个亮
  // 也可以使用:class="{on: '/msite'===$route.path}"实现点击对应路由组件 高亮
})