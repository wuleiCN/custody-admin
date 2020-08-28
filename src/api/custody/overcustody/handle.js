import request from '@/utils/request'

// 分页获取超期羁押信息
export function superviseHandleHistory(data) {
  return request({
    url: 'supervise/supervise-handle-history/superviseHandleHistory/list',
    method: 'post',
    data
  })
}

// 根据id查找督办历史
export function findSuperviseHandleHistory(id) {
  return request({
    url: `supervise/supervise-handle-history/superviseHandleHistory/find/${id}`,
    method: 'get'
  })
}

// 新增督办
export function addSuperviseHandle(data) {
  return request({
    url: 'supervise/supervise-handle-history/superviseHandleHistory/add',
    method: 'post',
    data
  })
}

// 一键督办
export function addsSuperviseHandle(data) {
  return request({
    url: 'supervise/supervise-handle-history/superviseHandleHistory/adds',
    method: 'post',
    data
  })
}

// 超期羁押统计
export function superviseHandleHistoryStatistics() {
  return request({
    url: 'supervise/supervise-handle-history/superviseHandleHistory/queryStatistics1',
    method: 'post'
  })
}
