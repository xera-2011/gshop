// 包含多个基于state的getter计算属性的对象
export default {
  // 数组.reduce(上一次调用回调时的返回值,处理的数组元素)计算总和

  // 食品总数量
  totalCount(state) {
    // food.count食品数量
    return state.cartFoods.reduce((total, food) => total + food.count, 0)//0 是初始值
  },
  // 食品总价
  totalPrice(state) {
    // food.count食品数量 * food.price食品价格 = 总价
    return state.cartFoods.reduce((total, food) => total + food.count * food.price, 0)
  },
  // 满意评价的总数量(rating.rateType===0则是满意评价如果不为0,就是是不满意)
  positiveSize(state) {
    return state.ratings.reduce((total, rating) => total + (rating.rateType == 0 ? 1 : 0), 0)
  }
}
