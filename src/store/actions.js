// Action: 通过操作mutation间接更新state的多个方法的对象

// 引入api接口---使用已经封装好的ajax,异步获取数据
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'
// 引入常量mutation-types.js---将数据提交给mutation,让他存储到state数据状态中
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

// 查看api文档 判断是否要从state中获取对应的数据,进行设置参数
// 还要看文档中成功的返回结果什么,这里的是 "code": 0
export default {

  // 1. 异步获取地址
  async getAddress({ commit, state }) {
    // 从state中获取经纬度存储到geohash(这个名字要看api文档)
    const geohash = state.latitude + ',' + state.longitude
    // 异步发送ajax请求(这个方法已经在封装好的axios中,直接传参即可)
    const result = await reqAddress(geohash)
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },

  // 2. 异步获取食品分类列表
  async getCategorys({ commit }) {
    // 异步发送ajax请求
    const result = await reqCategorys()
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },

  // 3. 异步获取商家列表
  async getShops({ commit, state }) {
    // 从state中获取参数
    const { latitude, longitude } = state
    // 异步发送ajax请求
    const result = await reqShops({ longitude, latitude })
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 4.1 同步记录用户信息(这里是在Login.vue中获取已经拿到的用户信息)
  // 注意这里userInfo的位置,他和stata不同,他是从Login.vue传来的数据
  saveUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 4.2 异步获取用户信息(这个是获取浏览器session会话中存放的用户信息)
  async getUserInfo({ commit }) {
    // 发送异步ajax请求
    const result = await reqUserInfo()
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  // 4.3 异步发送退出登录请求
  async logout({ commit }) {
    const result = await reqLogout()
    // 如成功则提交一个mutation,退出登录无需传参
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 5.1 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code == 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 5.2 异步获取商家评价列表---callback和fn都可以代表传入参数是函数---这里传入的是BetterScroll函数
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code == 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 数据更新了，通知组件(下面的&&(并且)写法是因为可能没有传callback过来,以防报错,写了之后可传可不传)
      callback && callback()
    }
  },
  // 5.3 异步获取商家商品列表---callback和fn都可以代表传入参数是函数---这里传入的是BetterScroll函数
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code == 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 数据更新了，通知组件(下面的&&(并且)写法是因为可能没有传callback过来,以防报错,写了之后可传可不传)
      callback && callback()
    }
  },

  // 6. 同步更新food中的count食品数量---在CartControl.vue中的点击事件调用
  updateFoodCount({ commit }, { isAdd, food }) {
    // 判断点击的是否是增加
    if (isAdd) {
      // true 则提交一个增加的mutation,并传入参数
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      // false 则提交一个减少的mutation,并传入参数
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 7. 同步清空购物车
  clearCart({ commit }) {
    // 不用传参 直接提交一个mutation
    commit(CLEAR_CART)
  },

  // 8.异步请求搜索商家
  async getSearchShops({ commit, state }, keyword) {
    // 从state中获取经纬度存储到geohash(这个名字要看api文档)
    const geohash = state.latitude + ',' + state.longitude
    // 异步发送ajax请求(这个方法已经在封装好的axios中,直接传参即可)
    const result = await reqSearchShop(geohash, keyword)
    // 如成功则提交一个mutation(并根据api文档传参)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
}