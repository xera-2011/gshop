// 操控数据变化(增减,更新),接受数据并处理数据（同步操作）
import Vue from 'vue'//因为要用到vue的api
// 统一在mutation-types.js里使用常量替代 mutation 事件类型
// 也就是在mutation-types.js里取名字,在这里引入使用
// 可以对整个 app 包含的 mutation 一目了然（也非必须）
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
// [方法名](state,{param}){}
export default {
  // 这里的state.address是state.js里的数据状态，
  // { address }是从服务端 获取 到包含数据的对象
  // 在这里mutations.js进行储存
  // 在action.js从服务端异步 获取 数据（action.js会调用这里的方法）

  // 1.存储地址
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },

  // 2.存储食品分类列表
  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },

  // 3.存储商家列表
  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },

  // 4.1 存储用户信息
  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  // 4.2 清空用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}//请清空用户登录数据
  },

  // 5.1 存储商家信息
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  // 5.2 存储商家评价列表
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  // 5.3 存储商家商品列表
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },

  // 6.1 存储购物车增加后food中的count食品数量
  [INCREMENT_FOOD_COUNT](state, { food }) {
    // 判断数据是否为空,空则是 第一次增加
    if (!food.count) {
      //新增数据无绑定同步效果,用Vue.set(对象,属性名,属性值)解决
      Vue.set(food, 'count', 1)
      // 新增数据存入购物车cartFoods
      state.cartFoods.push(food)
      //非新增数据,则直接商品数量+1即可
    } else {
      food.count++
    }
    // 将最后的cartFoods数据存储到网页的localStorage中(注意,只能存字符串)
    // localStorage.setItem('cartFoods', JSON.stringify(state.cartFoods))//----------localStorage(未实现)
  },
  // 6.2 存储购物车减少后food中的count食品数量
  [DECREMENT_FOOD_COUNT](state, { food }) {
    // 确保里面有值,不然就会产生负数
    if (food.count) {
      food.count--
      // 当购物车食品数量为0时
      if (food.count === 0) {
        // 将food从cartFoods中移除 splice(要删除的索引[i],删除项数)
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
    // 将最后的cartFoods数据存储到网页的localStorage中(注意,只能存字符串)
    // localStorage.setItem('cartFoods', JSON.stringify(state.cartFoods))//----------localStorage(未实现)
  },

  // 7. 清空购物车
  [CLEAR_CART](state) {
    // 循环归零购物车中每种食品的数量
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    // 移除购物车的数据
    state.cartFoods = []
    // 将最后的cartFoods数据存储到网页的localStorage中(注意,只能存字符串)
    // localStorage.setItem('cartFoods', JSON.stringify(state.cartFoods))//----------localStorage(未实现)
  },

  // 8.存储搜索内容
  [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
    state.searchShops = searchShops
  }
}