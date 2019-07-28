// ajax请求函数模块
import axios from 'axios'
const service = axios.create({
  // baseURL: process.env.API_ROOT,// 接口的域名地址
  // baseURL: '/api',// 接口的域名地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 向外部暴露一个函数 'axios'
// url 请求路径, 默认为空
// data 请求参数, 默认为空对象
// type 请求方法, 默认为GET

export default function ajax(url = '', data = {}, type = 'GET') {
  // 返回值 Promise对象 （异步返回的数据是response.data，而不是response）还不懂,就去翻看axios(Promise)笔记
  return new Promise((resolve, reject) => {
    let promise // 这个内部的promise用来保存axios的返回值(Promise对象)
    // 有可能是大小写,都转成小写
    if (type.toLowerCase() === 'get') {
      let dataStr = '' // 数据拼接字符串，将data连接到url
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // 成功回调resolve()
      resolve(response.data)
    })
      .catch(error => {
        // 失败回调reject()
        reject(error)
      })
  })
}
