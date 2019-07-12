// api.js
import ajax from './ajax'

// 接口
const api = {
  // 1、根据经纬度获取位置详情 参数类型：param 请求方式：GET
  reqAddress(geohash) {
    return ajax(`/position/${geohash}`)
  },
  // 2、获取食品分类列表 参数类型：无 请求方式：GET
  reqCategorys() {
    return ajax('/index_category')
  },
  // 3、根据经纬度获取商铺列表 参数类型：query 请求方式：GET
  reqShops({ longitude, latitude }) {
    return ajax('/shops', { longitude, latitude })
  },
  // 4、根据经纬度和关键字搜索商铺列表 参数类型：query 请求方式：GET
  reqSearchShop({ geohash, keyword }) {
    return ajax('/search_shops', { geohash, keyword })
  },
  // 5、获取一次性验证码 请求方式：GET
  reqFoodTypes() {
    return ajax('/captcha')
  },
  // 6、用户名密码登陆

  // 7、发送短信验证码
  // 8、手机号验证码登陆
  // 9、根据会话获取用户信息
  // 10、用户登出
}
export default api