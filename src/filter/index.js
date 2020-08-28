import Vue from 'vue'
import { formatTime, parseTime } from '@/utils/index.js'

Vue.filter('dateformat', function(dataStr, pattern = '{y}/{m}/{d} {h}:{i}') {
  return formatTime(dataStr, pattern)
})
Vue.filter('findNameByKey', function(val, dict, value = 'name', key = 'id') {
  const item = dict.find(item => val === item[key])
  return item[value]
})
Vue.filter('parseTime', function(dataStr, pattern = '{y}/{m}/{d} {h}:{i}:{s}') {
  return parseTime(dataStr, pattern)
})
