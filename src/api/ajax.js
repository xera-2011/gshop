// ajax请求函数模块
import axios from 'axios'
const service = axios.create({
  // baseURL: process.env.API_ROOT,// 接口的域名地址
  baseURL: '/api',// 接口的域名地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 向外部暴露一个函数 'axios'
// url 请求路径, 默认为空
// data 请求参数, 默认为空对象
// type 请求方法, 默认为GET

export default function ajax(url = '', data = {}, type = 'GET') {
  // 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
  return new Promise((resolve, reject) => {
    const dataStr = {
      url, type
    }
    // 有可能是大小写,都转成小写
    if (type.toLowerCase() === 'get') {
      dataStr.params = data
    } else {
      dataStr.data = data
    }
    service(options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}