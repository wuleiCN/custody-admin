import request from '@/utils/request'

// 查询日志
export function getJourmalList(data) {
  return request({
    url: 'supervise/operate-log-server/operationLogInfo/list',
    method: 'post',
    data: data
  })
}

// 查询日志状态字典
export function getJourmalCode() {
  return request({
    url: 'supervise/operate-log-server/operationLogInfo/getResponseCode',
    method: 'post'
  })
}
