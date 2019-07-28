// 包含n个mutation的type名称常量
// 让整个 app 包含的 mutation 一目了然
// 适用于多人协作的大型项目,中小型项目可有可无
// 这个文件由actions.js引入,进行异步从服务器获取数据
export const RECEIVE_ADDRESS = 'receive_address'// 接收地址信息
export const RECEIVE_CATEGORYS = 'receive_categorys'// 接收食品分类数组
export const RECEIVE_SHOPS = 'receive_shops'// 接收商家列表数组
export const RECEIVE_USER_INFO = 'receive_user_info'//接受用户信息
export const RESET_USER_INFO = 'reset_user_info'

export const RECEIVE_INFO = 'receive_info' // 接收商家信息
export const RECEIVE_RATINGS = 'receive_ratings' // 接收商家评价数组
export const RECEIVE_GOODS = 'receive_goods' // 接收商品数组

export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 增加food中的count
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' // 减少food中的count
export const CLEAR_CART = 'clear_cart' // 清空购物车

export const RECEIVE_SEARCH_SHOPS = 'receive_search_shops' // 接收搜索的商家数组