import Vue from 'vue'
// import moment from 'moment' // moment体积过大 改用date-fns
// import {format} from 'date-fns' // 这个是把整个date-fns 都导入进来了
import format from 'date-fns/format' // 按需导入
// 自定义过滤器
Vue.filter('date-format', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  // return moment(value).format(formatStr)
  return format(value, formatStr)
})
