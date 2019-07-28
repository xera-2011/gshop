// State数据状态: 名字必须有关联性,不然别人看的会很麻烦
// 信息存储为对象{}
// 列表存储为数组[]
// 但根据业务和API接口判断是 [] 还是 {}

// 当刷新再次进入网站时,也会重新调用vuex数据,这时候可以把购物车的数据在localStorage中读出来,就能保证刷新或再次进入网站 购车数据不丢失(未实现)
// var cartFoods = JSON.parse(localStorage.getItem('cartFoods') || '[]')//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。(未实现)
// 初始化一个 仓储
export default {
  latitude: 22.529781, // 纬度
  longitude: 114.043265, // 经度

  address: {}, // 地址相关信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
  userInfo: {}, // 用户信息

  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  
  // cartFoods: cartFoods,(未实现)
  cartFoods: [], // 商家购物车中食物的列表
  searchShops: [] // 搜索得到的商家列表
}