// api.js 与后台交换信息(依赖已经封装好的ajax函数)
import ajax from './ajax'
export const BASE_URL = './api'// 设置一个根路径(也设置了跨域替换)

//param参数类型GET方式 ajax(`${根路径}/position/${参数}`)
//       无参数GET方式 ajax(根路径+'/api地址')
//query参数类型GET方式 ajax(根路径+'/api路径',{参数})

// 传参注意(一般的情况)
// 1.经纬度xy、用户名密码验证码 就需要{}包裹 如下
// ({ latitude, longitude })或者({ name, pwd, captcha })
// 2.而搜索请求 则是 经纬度坐标geohash，和用户搜索关键字keyword分开获取的 如下
// (geohash, keyword)
// 3.单个参数情况 如下
// geohash


// 1、根据经纬度获取位置详情 参数类型：param 请求方式：GET
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

// 2、获取食品分类列表 参数类型：无 请求方式：GET
export const reqCategorys = () => ajax(BASE_URL + '/index_category')

// 3、根据经纬度获取商铺列表 参数类型：query 请求方式：GET
export const reqShops = ({ latitude, longitude }) => ajax(BASE_URL + '/shops', { latitude, longitude })

// 4、根据经纬度和关键字搜索商铺列表 参数类型：query 请求方式：GET-----------注意!这里的传值不能用{}包起来,因为两个参数是分开传输的
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { geohash, keyword })

// 5、获取一次性验证码 请求方式：GET
// 非ajax请求，使用src获取即可，通过methods定义点击改变

// 6、用户名密码登陆 参数类型: 请求体 请求方式：POST
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')

// 7、发送短信验证码 参数类型: query 请求方式：GET---------这里我尝试在组件中自己发送请求拼接链接获取数据
// export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', { phone })

// 8、手机号验证码登陆 参数类型: 请求体 请求方式：POST
export const reqSmsLogin = ({ phone, code }) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')

// 9、根据会话获取用户信息 参数类型：无 请求方式：GET
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

// 10、用户登出 参数类型：无 请求方式：GET
export const reqLogout = () => ajax(BASE_URL + '/logout')

/**
 * 下列请求由mock拦截并返回 不需要代理
 */
// 获取商家信息
export const reqShopInfo = () => ajax('/info')
// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods = () => ajax('/goods')
