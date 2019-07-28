// vuex最核心的管理对象store
// 组装模块并导出store的地方
import Vue from 'vue'
import Vuex from 'vuex'
// 核心模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 必须声明使用
Vue.use(Vuex)

// 初始化仓储,并暴露全局
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})